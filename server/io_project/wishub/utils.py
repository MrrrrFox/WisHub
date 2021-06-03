from django.db import models
from django.core.exceptions import ValidationError
import requests


class VoteType(models.TextChoices):
    UP = "up"
    DOWN = "down"


def url_validator(link: str) -> None:
    try:
        if not requests.get(link).status_code == 200:
            raise ValidationError("Wrong url")
    except Exception:
        raise ValidationError("Wrong url")
