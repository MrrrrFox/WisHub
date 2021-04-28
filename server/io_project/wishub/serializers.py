from rest_framework.serializers import ModelSerializer

from .models import Post, Subject, Domain

class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        #TO DO: Add ID?
        fields = ('author', 'link', 'description', 'subject')


class SubjectSerializer(ModelSerializer):
    class Meta:
        model = Subject
        fields = ('title', 'domain')


class DomainSerializer(ModelSerializer):
    class Meta:
        model = Domain
        fields = ('title')
