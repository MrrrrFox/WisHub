from django.db import models
from django.core.exceptions import ValidationError
import requests
from typing import List
from users.models import CustomUser


class VoteType(models.TextChoices):
    UP = "up"
    DOWN = "down"


def url_validator(link: str) -> None:
    try:
        if not requests.get(link).status_code == 200:
            raise ValidationError("Wrong url")
    except Exception:
        raise ValidationError("Wrong url")


def get_admins_mails() -> List[str]:
        return list(map(
            lambda x: x[0], 
            CustomUser.objects.filter(is_superuser=True).values_list("email"))
        )

