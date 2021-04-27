from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User #is it making a proper table?
# Create your models here.

#Is it necessary or handled automatically?
# class User(models.Model):
#     first_name = models.CharField(max_length=40)
#     last_name = models.CharField(max_length=40)

class Post(models.Model):

    ADVANCEMENT_LEVEL = (
        ('BE', 'Beginer'),
        ('IN', 'Intermediate'),
        ('AD', 'Advanced'),
    )
    #related_name argument for author?
    author = models.ForeignKey(User, on_delete = models.CASCADE)
    link = models.CharField(max_length=100, default=None) #TO DO: Some validation?
    description = models.TextField(max_length = 300)
    created = models.DateTimeField(auto_now_add = True)
    updated = models.DateTimeField(auto_now = True)
    level = models.CharField(max_length = 15, choices = ADVANCEMENT_LEVEL,
                             default = 'BE')
    num_upvoted = models.IntegerField(default=0)
    num_downvoted = models.IntegerField(default=0)

class Meta:
    ordering = ( '-publish' )

def __str__(self):
    return(self.description)
