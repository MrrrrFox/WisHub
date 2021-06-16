from users.models import CustomUser, UserProfile
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseNotFound, JsonResponse
from .models import Post, Subject, Domain, Comment, UserVotes
from .serializers import CommentSerializer, PostSerializer, SubjectSerializer, DomainSerializer, CreatePostSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.decorators import action, permission_classes
from rest_framework import viewsets, status, permissions
from rest_framework.views import APIView
from django.core.mail import mail_admins, send_mail
from .utils import VoteType, get_admins_mails
from .custom_renderers import JPEGRenderer, PNGRenderer
from wsgiref.util import FileWrapper
import datetime
import base64

# Create your views here.


# After tutorial:
class PostViewSet(viewsets.ModelViewSet):
    """ViewSet class for the Posts

    Custom function to filter all the posts from the desired subject.
    To get all the posts from the subject e.g. with id=1, use URL like below:
    /posts/1/by-subject/"""

    # model = Post
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return CreatePostSerializer
        return PostSerializer

    @action(methods=['get'], detail=True, url_path='by-subject',
            url_name='by_subject')
    def get_by_subject_id(self, request, pk=None):
        queryset = Post.objects.filter(subject=pk)
        serializer = PostSerializer(queryset, many=True)
        return JsonResponse(serializer.data, safe=False)

    @action(methods=['get'], detail=True, url_path='by-author',
            url_name='by_author')
    def get_post_by_author_id(self, request, pk=None):
        posts = Post.objects.filter(author=pk)
        serializer = PostSerializer(posts, many=True)
        return JsonResponse(serializer.data, safe=False)

    @action(methods=['post'], detail=True, url_path='report-post')
    @permission_classes([permissions.IsAuthenticated])
    def report_post(self, request, pk=None):
        desired_post = Post.objects.filter(id=pk).first()

        message = f"""The following post has been reported: 
                   {str(desired_post)}\n
                   id: {desired_post.id}
                   author: {CustomUser.objects.filter(id=desired_post.author_id).first()}
                   created at: {desired_post.created}
                   (up, down): ({desired_post.num_upvoted}, {desired_post.num_downvoted})

                   with the following comment:\n
                   {request.data.get('message')}\n
                   date: {datetime.datetime.now()}
                   reporter: {request.user.email}
                   """

        print(message)
        send_mail(

            subject="User message",
            from_email=request.user.email,
            message=message,
            recipient_list=get_admins_mails()
        )

        return JsonResponse({"message": "post reported"}, safe=False)

    @action(methods=['post'], detail=True, url_path='vote-post')
    def vote_post(self, request, pk=None) -> JsonResponse:
        """Request should look like this:
            {
                "user_id" : [number with id],
                "vote_type": "up"/"down"
            }"""

        try:
            desired_post = Post.objects.filter(id=pk)[0]
            current_user = CustomUser.objects.filter(id=request.data['user_id'])[0]
            if request.data['vote_type'] == VoteType.UP:
                desired_post.upvote(current_user)

            elif request.data['vote_type'] == VoteType.DOWN:
                desired_post.downvote(current_user)
            else:
                return JsonResponse({"error_message": "Vote type not allowed"}, status=status.HTTP_501_NOT_IMPLEMENTED)
        except Exception as ex:
            return JsonResponse({"error_message": str(ex)}, status_codes=status.HTTP_405_METHOD_NOT_ALLOWED)

            # here returning error code
        return JsonResponse(self.serializer_class(desired_post).data, safe=False)

    @action(methods=['post'], detail=True, url_path='unvote-post')
    def unvote_post(self, request, pk=None) -> JsonResponse:
        """
        If a user with user_id voted for the post with id = pk,
        removes its vote.
        Request should look like this:
            {
                "user_id" : [number with id]
            }
        """
        result = UserVotes.objects.filter(user=request.data['user_id'], post=pk)
        if len(result) == 0:
            print("User was not voting yet!")
            return JsonResponse({"error_message": "User did not vote yet!"}, status=status.HTTP_204_NO_CONTENT)
        elif len(result) == 1:
            post = Post.objects.filter(id=pk)[0]
            if result[0].vote_type == "up":
                post.num_upvoted -= 1
            elif result[0].vote_type == "down":
                post.num_downvoted -= 1
            result.delete()
            post.save()
            return JsonResponse({"success_message": "Vote was deleted!"})
        else:
            return JsonResponse({"error_message": "Unspecified number of votes"},
                                status=status.HTTP_417_EXPECTATION_FAILED)

    @action(methods=['post'], detail=True, url_path='check-votes')
    def check_votes_for_user(self, request, pk=None):
        """
        Returns info if user with featured user_id, voted for the post
        with id = pk argument.
            Request should look like this:
            {
                "user_id" : [number with id]
            }
        """
        result = UserVotes.objects.filter(user=request.data['user_id'], post=pk)
        if len(result) == 0:
            print("User was not voting yet!")
            return JsonResponse({"error_message": "User did not vote yet!"})
        else:
            try:
                vote = result[0]
                return JsonResponse({"vote_type": str(vote.vote_type)})
            except Exception as ex:
                return JsonResponse({"error_message": str(ex)})

    @action(methods=['get'], detail=True, url_path='all-voted-by-user')
    def all_voted_by_user(self, request, pk=None):
        """
        Returns information about all posts voted by the user.
        Gives information about type of votes.
        pk in the route is a user id
        """
        post_dict = {_.post.id: _.vote_type
                     for _ in UserVotes.objects.filter(user=pk)}
        return JsonResponse(post_dict, safe=False)

    @action(methods=['post'], detail=True, url_path='comment', url_name='comment')
    def comment_post(self, request, pk=None) -> JsonResponse:
        post = Post.objects.filter(id=pk).first()
        post.comment(**request.data)
        return self.comments(None, pk=pk)

    @action(methods=['get'], detail=True, url_path='comments', url_name='comments')
    def comments(self, request, pk=None) -> JsonResponse:
        post = Post.objects.filter(id=pk).first()
        return JsonResponse(
            CommentSerializer(
                post.get_comments(),
                many=True,
                fields=('id', 'author', 'body', 'created_date', 'num_upvoted', 'num_downvoted')
            ).data,
            safe=False
        )


class SubjectViewSet(viewsets.ModelViewSet):
    """
    ViewSet class for the Subjects

    Custom function to filter all the subjects from the desired domain.
    To get all the subjects from the domain e.g. with id=1, use URL like below:
    /subjects/1/by-domain/
    """
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

    @action(methods=['get'], detail=True, url_path='by-domain',
            url_name='by_domain')
    def get_by_domain_id(self, request, pk=None):
        queryset = self.queryset.filter(domain=pk)
        serializer = SubjectSerializer(queryset, many=True)
        return JsonResponse(serializer.data, safe=False)


class DomainViewSet(viewsets.ModelViewSet):
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer


class CommentViewSet(viewsets.ModelViewSet):
    # lookup_field = 'pk'
    # lookup_url_kwarg = 'post_pk'
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    # @action(methods=['get'], detail=True)
    # def comments(self, request, pk=None) -> JsonResponse:
    #     post = Post.objects.filter(id=pk).first()

    #     return JsonResponse(
    #         CommentSerializer(
    #             post.get_comments(),
    #             many=True,
    #             fields=('id', 'author', 'body', 'created_date', 'num_upvoted', 'num_downvoted')
    #         )\
    #         .data,
    #         safe=False
    #         )

    # @action(methods=['get'], detail=True)
    # def view_comment(self, request, pk=None, **kwargs) -> JsonResponse:
    #     print("elo")
    #     post_id = kwargs.get("post_pk")
    #     print(post_id)
    #     comment_id = kwargs.get("comment_pk")
    #     print(comment_id)
    #     print(pk)
    #     print("elo")

    #     comment = Comment.objects.filter(id=comment_id)

    #     return JsonResponse(
    #         CommentSerializer(comment).data,
    #         safe=False
    #     )

    # @action(methods=['post'], detail=True, url_path='vote-comment')
    # def vote_post(self, request, **kwargs) -> JsonResponse:
    #     """Request should look like this:
    #         {
    #             "user_id" : [number with id],
    #             "vote_type": "up"/"down"
    #         }"""
    #     try:
    #         post_id = kwargs.get("pk")
    #         comment_id = kwargs.get("comment_pk")
    #         desired_comment= Comment.objects.filter(id=post_id)[0]
    #         current_user = CustomUser.objects.filter(id=request.data['user_id'])[0]
    #         if request.data.vote_type == VoteType.UP:
    #             desired_comment.upvote(current_user)

    #         elif request.data.vote_type == VoteType.DOWN:
    #             desired_comment.downvote(current_user)
    #         else:
    #             print("Incorrect vote_type parameter in the request")
    #     except Exception as ex:
    #         return JsonResponse({"error_message": str(ex) }, status_codes=status.HTTP_405_METHOD_NOT_ALLOWED)
    #     return JsonResponse(self.serializer_class(desired_comment).data, safe=False)


# After Szumlak:
def post_detail(request, year, month, day, post):
    """Getting the post info by passing creation dates"""

    post = get_object_or_404(Post,
                             created__year=year,
                             created__month=month,
                             created__day=day)

    return render(
        request,
        'wishub/post/detail.html',
        {
            'post': post
        }
    )


class MessageAdmin(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        print(request.data.get("message"))

        send_mail(
            subject="User message",
            from_email=request.user.email,
            message=request.data.get("message"),
            recipient_list=get_admins_mails()
        )

        return JsonResponse(
            {"message": "Message sent"},
            status=status.HTTP_200_OK
        )


class UsersAvatars(APIView):
    renderer_classes = [JPEGRenderer, PNGRenderer]

    def get(self, request, *args, **kwargs):
        # return Response(
        #     FileWrapper(
        #         UserProfile.get_or_create(
        #             user=CustomUser.objects.get(
        #                 id=kwargs.pop("id")
        #             )
        #         ).avatar.open()
        #     )
        # )

        with open(str(UserProfile.get_or_create(user=CustomUser.objects.get(id=kwargs.pop("id"))).avatar), "rb") as f:
            image_data = base64.b64encode(f.read()).decode('utf-8')
        return JsonResponse(
            {"avatar": image_data},
            status=status.HTTP_200_OK
        )


class CurrentUserAvatar(APIView):
    permission_classes = [permissions.IsAuthenticated]
    renderer_classes = [JPEGRenderer, PNGRenderer]

    def get(self, request, *args, **kwargs):
        with open(str(UserProfile.get_or_create(user=request.user).avatar), "rb") as f:
            image_data = base64.b64encode(f.read()).decode('utf-8')

        return JsonResponse(
            {"avatar": image_data},
            status=status.HTTP_200_OK
        )

    def post(self, request, *args, **kwargs):
        UserProfile.create_or_update(
            user=request.user,
            avatar=request.FILES["avatar"]
        )

        return JsonResponse(
            {"message": "Avatar set"},
            status=status.HTTP_200_OK
        )


class UserVoted(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """
        Returns information about all posts voted by the user.
        Gives information about type of votes.
        """

        post_dict = {_.post.id: _.vote_type
                     for _ in UserVotes.objects.filter(user=request.user.id)}
        return JsonResponse(post_dict, safe=False)
