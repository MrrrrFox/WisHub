from django.db import models, IntegrityError
from django.utils import timezone
# from django.contrib.auth.models import User #is it making a proper table?
from users.models import CustomUser

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
    link = models.CharField(max_length=100, default=None) #TO DO: Some validation?
    description = models.TextField(max_length = 300)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE,
                    blank=True, null=True)#TO DO: add unique=true (later)
    level = models.CharField(max_length = 15, choices = ADVANCEMENT_LEVEL,
                             default = 'BE')
    created = models.DateTimeField(auto_now_add = True)
    updated = models.DateTimeField(auto_now = True)
    num_upvoted = models.IntegerField(default=0)
    num_downvoted = models.IntegerField(default=0)

    def upvote(self, user):
        try:
            self.post_votes.create(user=user, post=self, vote_type="up")
            self.num_upvoted += 1
            self.save()
        except IntegrityError:
            raise Exception('already_voted')
        return 'ok'

    def downvote(self, user):
        try:
            self.post_votes.create(user=user, post=self, vote_type="down")
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
    user = models.ForeignKey(CustomUser, related_name="user_votes", on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name="post_votes", on_delete=models.CASCADE)
    vote_type = models.CharField(max_length=5)

    class Meta:
        unique_together = ('user', 'post')
