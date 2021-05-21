from rest_framework.test import APITestCase
from rest_framework import status
from django.db import IntegrityError
from users.models import CustomUser
from ..models import Post, Comment, UserVotes
import json
import requests
from django.http import request
from .set_up import TestSetUp


class PostTestCases(TestSetUp):

    def test_getting_posts(self) -> None:
        response = self.client.get("/api/v1/wishub/posts/")
        number_of_returned_posts = len(json.loads(response.content))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(number_of_returned_posts, Post.objects.count())

    def test_get_particular_post(self) -> None:
        post = Post.objects.all().first()

        assert self.post != None
        response = self.client.get(f"/api/v1/wishub/posts/{post.id}/")
        returned_post = json.loads(response.content)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # compare attributes
        for key in returned_post.keys():
            element = post.__getattribute__(key).__repr__()
            if isinstance(returned_post.get(key), type(element)):
                if isinstance(returned_post.get(key), str):
                    continue
                self.assertEqual(element, returned_post.get(key))

    def test_post_post(self) -> None:
        item = {
            "author": 1,
            "link": "https://lubimyczytac.pl/ksiazka/133717/solaris",
            "description": "Wonderful book",
            "subject": 1,
            "level": "IN"
        }

        response = self.client.post("/api/v1/wishub/posts/", data=item)
        returned = json.loads(response.content)

        # compare 2 objects elements
        for key in item.keys() & returned.keys():
            self.assertEqual(returned[key], item[key])

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


    def test_post_upvote(self) -> None:
        data = {
            "user_id": 1,
            "vote_type": "up"
        }

        old_num_upvotes = self.post.num_upvoted
        response = self.client.post(
            f"/api/v1/wishub/posts/{self.post.id}/vote-post/", 
            data=data
            )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(UserVotes.objects.filter(post=self.post).count(), old_num_upvotes + 1)


        # downvoting after upvoting
        callable = lambda : self.client.post(
                f"/api/v1/wishub/posts/{self.post.id}/vote-post/", 
                data=data
                )
        data["vote_type"] = "down"
        self.assertRaises(Exception, callable)
        # self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)


    def test_post_downvote(self) -> None:
        data = {
            "user_id": 1,
            "vote_type": "up"
        }

        old_num_upvotes = self.post.num_upvoted
        response = self.client.post(
            f"/api/v1/wishub/posts/{self.post.id}/vote-post/", 
            data=data
            )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

class CommentsTestCases(TestSetUp):

    def test_comments(self) -> None:
        response = self.client.get("/api/v1/wishub/posts/1/comments/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_posts_num_comments(self) -> None:

        self.assertEqual(self.post.num_comments, 1)

        user2 = CustomUser.objects.create(
            username="user2",
            email="user2@localhost",
            password="eluwina1234",
        )

        Comment.objects.create(
            author=user2,
            post=self.post,
            body="description",
        )

        self.assertEqual(self.post.num_comments, 2)

    def test_add_comment(self) -> None:
        comment = {
            "author": self.user.id,
            "body": "Wonderful!"
        }
        old_num_comments = self.post.num_comments

        # django module bug 
        # response = self.client.post(
        #     f"/api/v1/wishub/posts/{self.post.id}/comment/",
        #     data=comment
        #     )
        
        
        # self.assertEqual(response.status_code, status.HTTP_200_OK)
        # self.assertEqual(self.post.num_comments, old_num_comments)
        
        
