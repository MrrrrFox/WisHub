from django.db import models, IntegrityError
from django.utils import timezone
# from django.contrib.auth.models import User #is it making a proper table?
from users.models import CustomUser
from .utils import url_validator, VoteType

# Create your models here.


class Domain(models.Model):
    '''Represents a domain e.g. Programming or Maths, which groups subjects '''

    title = models.CharField(max_length=30)

    def __str__(self):
        return self.title


class Subject(models.Model):
    """Represents a patricular subject to learn, e.g. Django or heapsort"""

    title = models.CharField(max_length=30)
    domain = models.ForeignKey(Domain, on_delete=models.CASCADE,
                        blank=True, null=True) #TO DO: add unique=true (later)

    def __str__(self):
        return self.title

class Post(models.Model):
    """Represents a singular post with a link to some learning materials"""

    ADVANCEMENT_LEVEL = (
        ('BE', 'Beginer'),
        ('IN', 'Intermediate'),
        ('AD', 'Advanced'),
    )
    #TO DO: related_name argument for author? To add or not?
    author = models.ForeignKey(CustomUser, on_delete = models.CASCADE)
    link = models.URLField(default=None, validators=[url_validator]) 
    description = models.TextField(max_length = 300)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE,
                    blank=True, null=True)#TO DO: add unique=true (later)
    level = models.CharField(max_length = 15, choices = ADVANCEMENT_LEVEL,
                             default = 'BE')
    created = models.DateTimeField(auto_now_add = True)
    updated = models.DateTimeField(auto_now = True)
    num_upvoted = models.IntegerField(default=0)
    num_downvoted = models.IntegerField(default=0)


    @property
    def num_comments(self) -> int:
        return Comment.objects.filter(post=self).count()
    
    def get_comments(self):
        return Comment.objects.filter(post=self)

    def comment(self, **kwargs):
        author = CustomUser.objects.filter(id=kwargs.get("author")).first()
        del kwargs["author"]

        Comment.objects.create(
            post=self,
            author=author,
            **kwargs
            )
    

    def upvote(self, user):
        try:
            UserVotes.objects.create(user=user, post=self, vote_type=VoteType.UP)
            self.num_upvoted += 1
            self.save()
        except IntegrityError:
            raise Exception('already_voted')
        return 'ok'

    def downvote(self, user):
        try:
            UserVotes.objects.create(user=user, post=self, vote_type=VoteType.DOWN)
            self.num_downvoted += 1
            self.save()
        except IntegrityError:
            raise Exception('already_voted')
        return 'ok'

    def __str__(self): #TO DO: This one should be changed to sth shorter
        return self.description

    class Meta:
        ordering = ( '-created', )

#trying to implement voting
class UserVotes(models.Model):
    user = models.ForeignKey(CustomUser, related_name="user_votes", on_delete=models.PROTECT)
    post = models.ForeignKey(Post, related_name="post_votes", on_delete=models.PROTECT)
    vote_type = models.CharField(max_length=5, choices=VoteType.choices)

    class Meta:
        unique_together = ('user', 'post')


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    author = models.ForeignKey(CustomUser, on_delete=models.PROTECT)
    body = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)
    approved_comment = models.BooleanField(default=True)

    @property
    def num_upvoted(self) -> int:
        return CommentVotes.objects.filter(comment=self, vote_type=VoteType.UP).count()

    @property
    def num_downvoted(self) -> int:
        return CommentVotes.objects.filter(comment=self, vote_type=VoteType.DOWN).count()

    def approve(self) -> None:
        self.approved_comment = True
        self.save()

    def str(self) -> str:
        return self.body

    def upvote(self, user) -> bool:
        try:
            CommentVotes.objects.create(user=user, comment=self, vote_type=VoteType.UP)
        except IntegrityError:
            raise Exception('already_voted')
        return True

    def downvote(self, user) -> bool:
        try:
            CommentVotes.objects.create(user=user, comment=self, vote_type=VoteType.DOWN)
        except IntegrityError:
            raise Exception('already_voted')
        return True

    def __str__(self): 
        return self.body

class CommentVotes(models.Model):
    user = models.ForeignKey(CustomUser, related_name="user_comment_votes", on_delete=models.PROTECT)
    comment = models.ForeignKey(Comment, related_name="comment_votes", on_delete=models.PROTECT)
    vote_type = models.CharField(max_length=5, choices=VoteType.choices)

    class Meta:
        unique_together = ('user', 'comment')