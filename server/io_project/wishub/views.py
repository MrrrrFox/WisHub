from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseNotFound, JsonResponse
from .models import Post, Subject, Domain
from .serializers import PostSerializer, SubjectSerializer, DomainSerializer
from users.models import CustomUser
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets


# Create your views here.

# After tutorial:
class PostViewSet(viewsets.ModelViewSet):
    '''ViewSet class for the Posts

    Custom function to filter all the posts from the desired subject.
    To get all the posts from the subject e.g. with id=1, use URL like below:
    /posts/1/by-subject/'''

    queryset = Post.objects.all()
    serializer_class = PostSerializer

    @action(methods=['get'], detail=True, url_path='by-subject',
            url_name='by_subject')
    def get_by_subject_id(self, request, pk=None):
        queryset = Post.objects.filter(subject=pk)
        serializer = PostSerializer(queryset, many=True)
        return JsonResponse(serializer.data, safe=False)

    @action(methods=['get'], detail=True, url_path='by-author',
        url_name='by_author')
    def get_post_by_author_id(self, request, pk=None):
        print(request.data['email'])
        posts = Post.objects.filter(author = pk)
        serializer = PostSerializer(posts, many=True)
        return JsonResponse(serializer.data, safe=False)

    @action(methods=['post'], detail=True, url_path='vote-post')
    def vote_post(self, request, pk=None):
        """Request should look like this:
            {
                "user_id" : [number with id],
                "vote_type": "up"/"down"
            }"""
        try:
            desired_post = Post.objects.filter(id=pk)[0]
            current_user = CustomUser.objects.filter(id = request.data['user_id'])[0]
            if request.data['vote_type']=="up":
                desired_post.upvote(current_user)
            elif request.data['vote_type']=="down":
                desired_post.downvote(current_user)
            else:
                print("Incorrect vote_type parameter in the request")
        except Exception as ex:
            print(ex)
        return JsonResponse(self.serializer_class(desired_post).data, safe=False)

class SubjectViewSet(viewsets.ModelViewSet):
    '''ViewSet class for the Subjects

    Custom function to filter all the subjects from the desired domain.
    To get all the subjects from the domain e.g. with id=1, use URL like below:
    /subjects/1/by-domain/'''
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


# example view
def my_view(request):
    return HttpResponse('<h1>Page was found</h1>')


# After Szumlak:
def post_detail(request, year, month, day, post):
    """Getting the post info by passing creation dates"""

    post = get_object_or_404(Post,
                             created__year=year,
                             created__month=month,
                             created__day=day)
    return render(request,
                  'wishub/post/detail.html',
                  {'post': post})
