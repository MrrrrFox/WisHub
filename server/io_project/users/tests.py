from django.test import TestCase

from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from .models import CustomUser


class AuthTestCases(APITestCase):

    def setUp(self) -> None:
        self.user = CustomUser.objects.create(
            email="test@loclahost",
            password="eluwina1234"
        )

    def test_registration(self) -> None:
        data = {
            "email": "test@localhost",
            "password1": "eluwina1234",
            "password2": "eluwina1234"
        }

        response = self.client.post(
            "/api/v1/users/auth/register/",
            data
        )
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
        status.HTTP_405_METHOD_NOT_ALLOWED
    
    # def test_login(self) -> None:

    #     data = {
    #         "email": "test@localhost",
    #         "password": "eluwina1234"
    #     }

    #     response = self.client.post(
    #         "/api/v1/users/auth/login/",
    #         data
    #     )
    #     self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)

    # def test_logout(self) -> None:
    #     # raise NotImplementedError
    #     pass


# class GetPostsTests(APITestCase):

#     def test_getting_all_posts(self) -> None:
#         # raise NotImplementedError
#         pass
