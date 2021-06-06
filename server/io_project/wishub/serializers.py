from rest_framework.serializers import ModelSerializer
from users.serializers import UserSerializer
from .models import Post, Subject, Domain, Comment


class DynamicFieldsModelSerializer(ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        fields = kwargs.pop('fields', None)

        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if fields:
            allowed = set(fields)
            existing = set(self.fields.keys())
            for field_name in existing - allowed:
                self.fields.pop(field_name)



class PostSerializer(ModelSerializer):
    author = UserSerializer()
    class Meta:
        model = Post
        fields = ('id', 'author', 'link', 'description', 'subject', 'level',
                  'num_upvoted', 'num_downvoted', 'created', 'num_comments')


class SubjectSerializer(ModelSerializer):
    class Meta:
        model = Subject
        fields = ('id', 'title', 'domain')


class DomainSerializer(ModelSerializer):
    class Meta:
        model = Domain
        fields = ('id', 'title',)


class CommentSerializer(DynamicFieldsModelSerializer):
    post = PostSerializer(read_only=True)
    # author = UserSerializer(read_only=True)
    author = UserSerializer()

    def get_comments(self, instance):
        return instance.values('author', 'body')

    class Meta:
        model = Comment
        fields = (
            'id', 'post', 'author', 'body',
            'created_date', 'approved_comment',
            'num_upvoted', 'num_downvoted'
        )
