from rest_framework.serializers import ModelSerializer

from .models import Post, Subject, Domain


class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'author', 'link', 'description', 'subject')


class SubjectSerializer(ModelSerializer):
    class Meta:
        model = Subject
        fields = ('id', 'title', 'domain')


class DomainSerializer(ModelSerializer):
    class Meta:
        model = Domain
        fields = ('id', 'title',)
