from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User
from django.db import models
from .utils import make_thumbnail
import os
from PIL import Image


class CustomUser(AbstractUser):
    # Any extra fields would go here

    def __str__(self):
        return self.email

class UserProfile(models.Model):
    user   = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to="avatars", default="avatars/default_avatar.png")

    def save(self, *args, **kwargs):

        self.avatar = make_thumbnail(self.avatar)
        super().save(*args, **kwargs)

    @staticmethod
    def create_or_update(user, avatar) -> None:
        profile = UserProfile.objects.filter(user=user).first()

        if profile is not None:
            if profile.avatar and profile.avatar.storage.exists(profile.avatar.name):
                os.remove(profile.avatar.path)
            
            profile.avatar = avatar
            profile.save()
            return   

        UserProfile.objects.create(user=user, avatar=avatar)


    @staticmethod
    def get_or_create(user):
        profile = UserProfile.objects.filter(user=user).first()

        if profile is None:
            profile = UserProfile.objects.create(user=user)

        return profile
  