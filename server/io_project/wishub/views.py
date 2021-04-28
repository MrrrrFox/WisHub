from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseNotFound
from .models import Post, Subject, Domain
from .serializers import PostSerializer, SubjectSerializer, DomainSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework import viewsets

# Create your views here.

#After tutorial:
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

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
