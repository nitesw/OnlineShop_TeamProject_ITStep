from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class CustomUser(AbstractUser):
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=100, blank=True)
    games_owned = models.PositiveIntegerField(default=0)
    discord_id = models.CharField(max_length=50, blank=True)
    twitch_url = models.URLField(blank=True)
    is_online = models.BooleanField(default=False)
    status_message = models.CharField(max_length=255, blank=True)
    # TODO: add ability to add other users to friends (aka field friends)