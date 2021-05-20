from rest_framework.serializers import ModelSerializer, DateTimeField
from datetime import datetime
from .models import Post, Subject, Domain


class PostSerializer(ModelSerializer):

    #Debugging field
    #created = DateTimeField(input_formats=['%Y-%m-%dT%H:%M:%S'])

    class Meta:
        model = Post
        fields = ('id', 'author', 'link', 'description', 'subject', 'level',
                'num_upvoted', 'num_downvoted', 'created' )


class SubjectSerializer(ModelSerializer):
    class Meta:
        model = Subject
        fields = ('id', 'title', 'domain')


class DomainSerializer(ModelSerializer):
    class Meta:
        model = Domain
        fields = ('id', 'title',)
