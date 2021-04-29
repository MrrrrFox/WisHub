from django.db import models
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

    def __str__(self): #TO DO: This one should be changed to sth shorter
        return self.description

    class Meta:
        ordering = ( '-created', )
