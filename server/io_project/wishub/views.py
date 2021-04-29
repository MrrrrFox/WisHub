from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseNotFound, JsonResponse
from .models import Post, Subject, Domain
from .serializers import PostSerializer, SubjectSerializer, DomainSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets

# Create your views here.

#After tutorial:
class PostViewSet(viewsets.ModelViewSet):
    '''ViewSet class for the Posts

    Custom function to filter all the posts from the desired subject.
    To get all the posts from the subject e.g. with id=1, use URL like below:
    /posts/1/by-domain/'''

    queryset = Post.objects.all()
    serializer_class = PostSerializer

    @action(methods=['get'], detail=True, url_path='by-subject',
        url_name='by_subject')
    def get_by_subject_id(self, request, pk=None):
        queryset = Post.objects.filter(subject = pk)
        serializer = PostSerializer(queryset, many=True)
        return JsonResponse(serializer.data, safe=False)

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Domain.objects.all()
    serializer_class = SubjectSerializer

class DomainViewSet(viewsets.ModelViewSet):
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer


#example view
def my_view(request):
    return HttpResponse('<h1>Page was found</h1>')

#After Szumlak:
def post_detail(request, year, month, day, post):
    '''Getting the post info by passing creation dates'''

    post = get_object_or_404(Post,
    created__year=year,
    created__month=month,
    created__day=day)
    return render(request,
            'wishub/post/detail.html',
             {'post': post})
