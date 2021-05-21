from django.test import TestCase

from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from ..models import CustomUser


class AuthTestCases(APITestCase):

    def setUp(self) -> None:
        self.user = CustomUser.objects.create(
            username="user1",
            email="test@gmail.com",
            password="adminadmin",
        )

        CustomUser.objects.create(
            username="user2",
            email="user2@localhost",
            password="eluwina1234",
        )

        CustomUser.objects.create(
            username="user3",
            email="user3@localhost",
            password="eluwina1234",
        )

        CustomUser.objects.create(
            username="user4",
            email="user4@localhost",
            password="eluwina1234",
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


    def test_registration_too_simple_password(self) -> None:
        data = {
            "username": "elko",
            "email": "user2@gmail.com",
            "password1": "admin",
            "password2": "admin"
        }

        response = self.client.post(
            "/api/v1/users/auth/register/",
            data
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    

    def test_registration_too_wrong_email(self) -> None:
        data = {
            "username": "elko",
            "email": "user2.com",
            "password1": "adminadmin",
            "password2": "adminadmin"
        }

        response = self.client.post(
            "/api/v1/users/auth/register/",
            data
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)



    def test_login_wrong_credentials(self) -> None:

        data = {
            "email": self.user.email,
            "password": "adminadmin"
        }

        response = self.client.post(
            "/api/v1/users/auth/login/",
            data
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
