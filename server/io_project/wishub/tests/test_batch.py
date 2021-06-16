from django.contrib.auth.models import User
from .set_up import TestSetUp
from ..models import Domain, Post
from rest_framework import status
from rest_framework.test import force_authenticate, APIRequestFactory
from ..views import CurrentUserAvatar, MessageAdmin, UserVoted
import json


class TestUserVoted(TestSetUp):

    def test_get_user_voted_posts(self):

        response = self.get_authenticated("/api/v1/wishub/user-voted-posts", UserVoted.as_view())
        data = json.loads(response.content)
        self.assertEqual(data, {})

        post = Post.objects.get(id=1)
        prev_upvotes = post.num_upvoted
        post.upvote(self.user)

        self.assertEqual(prev_upvotes + 1, post.num_upvoted)

        response = self.get_authenticated("/api/v1/wishub/user-voted-posts", UserVoted.as_view())
        data = json.loads(response.content)
        self.assertTrue(str(post.id) in data.keys())

        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_get_user_voted_as_not_authenticated(self):
        response = self.client.get("/api/v1/wishub/user-voted-posts")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestCurrentUserAvatar(TestSetUp):

    def test_get_current_user_avatar(self):
        response = self.get_authenticated(f"/api/v1/wishub/users/avatar", CurrentUserAvatar.as_view())
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_get_current_user_avatar_as_not_authenticated(self):
        response = self.client.get("/api/v1/wishub/users/avatar")
        self.assertEqual(response.status_code, status.HTTP_301_MOVED_PERMANENTLY)

    def test_post_without_image(self):

        self.assertRaises(
            ValueError,
            lambda : self.post_authenticated( f"/api/v1/wishub/domains/", CurrentUserAvatar.as_view())
        )

class TestUsersAvatars(TestSetUp):

    def test_get_user_avatar(self):
        response = self.client.get(f"/api/v1/wishub/users/{self.user.id}/avatar")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
   
class TestMessageAdmin(TestSetUp):

    def test_message_admin(self):
        response = self.post_authenticated(
            f"/api/v1/wishub/contact-admin/",
            MessageAdmin.as_view(),
            data={ "message": "wiadomość" }
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_message_not_authenticated(self):
        response = self.client.post("/api/v1/wishub/contact-admin/", {"message": "ok"})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)