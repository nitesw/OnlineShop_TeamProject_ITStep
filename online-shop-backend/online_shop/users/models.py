from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class Role(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(max_length=500, blank=True)

    def __str__(self):
        return self.name

class CustomUser(AbstractUser):
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=100, blank=True)
    discord_id = models.CharField(max_length=50, blank=True)
    twitch_url = models.URLField(blank=True)
    is_online = models.BooleanField(default=False)
    status_message = models.CharField(max_length=255, blank=True)
    role = models.ForeignKey(Role, related_name='users', on_delete=models.SET_NULL, null=True, blank=True)
    owned_games = models.ManyToManyField('games.Game', related_name='owners', blank=True)
    wishlist = models.ManyToManyField('games.Game', related_name='wishlist_by', blank=True)
    # TODO: add ability to add other users to friends (aka field friends)

    def save(self, *args, **kwargs):
        if not self.role:
            default_role = Role.objects.get(name='User')
            self.role = default_role
        super().save(*args, **kwargs)