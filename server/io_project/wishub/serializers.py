from rest_framework.serializers import ModelSerializer
from datetime import datetime
from .models import Post, Subject, Domain


class PostSerializer(ModelSerializer):

    class Meta:
        model = Post
        #TO DO: Add serializaion of dates
        fields = ('id', 'author', 'link', 'description', 'subject', 'level',
                'num_upvoted', 'num_downvoted' )


class SubjectSerializer(ModelSerializer):
    class Meta:
        model = Subject
        fields = ('id', 'title', 'domain')


class DomainSerializer(ModelSerializer):
    class Meta:
        model = Domain
        fields = ('id', 'title',)
