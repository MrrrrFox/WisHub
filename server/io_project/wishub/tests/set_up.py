from rest_framework.test import APIClient, APITestCase, APIRequestFactory, force_authenticate
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.contrib.auth.hashers import make_password
from users.models import CustomUser
from ..models import Post, Comment, Subject, Domain
import json

class TestSetUp(APITestCase):

    def setUp(self) -> None:

        self.password = "eluwina1234"
        self.user = CustomUser.objects.create(
            username="user1",
            email="user@localhost",
            password=make_password(self.password),
        )

        self.domain = Domain.objects.create(title="Sports")
        self.subject = Subject.objects.create(
            title="Differential Equations", 
            domain=self.domain
            )

        self.post = Post.objects.create(
            author=self.user,
            link='link.com',
            description='description',
        )

        self.comment = Comment.objects.create(
            author=self.user,
            post=self.post,
            body="body"
        )

    def login(self):

        client = APIClient()
        client.login(user=self.user.username, password="eluwina1234")

        response = self.client.post(
            "/api/v1/users/auth/login/",
            {
                "email": self.user.email,
                "password": self.password
            }
        )

        token = self.get_token()
        client.credentials(HTTP_AUTHORIZATION="Token " + token)

        return client, token
    
    def get_token(self):
        response = self.client.post(
            "/api/v1/users/auth/login/",
            {
                "email": self.user.email,
                "password": self.password
            }
        )

        return json.loads(response.content).get("key")
    
    def get_authenticated(self, link, view):
        factory = APIRequestFactory()
        request = factory.get(link)
        force_authenticate(request, user=self.user, token=self.get_token())

        return view(request)

    def post_authenticated(self, link, view, data={}):
        factory = APIRequestFactory()
        request = factory.post(link, data)
        force_authenticate(request, user=self.user, token=self.get_token())

        return view(request)
