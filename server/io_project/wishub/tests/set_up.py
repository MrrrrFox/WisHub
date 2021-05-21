from rest_framework.test import APITestCase
from rest_framework import status
from users.models import CustomUser
from ..models import Post, Comment, Subject, Domain

class TestSetUp(APITestCase):

    def setUp(self) -> None:

        self.user = CustomUser.objects.create(
            username="user1",
            email="user@localhost",
            password="eluwina1234",
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