import datetime
import os
import re
import uuid

from django.contrib.auth.models import AbstractUser
from django.core.validators import FileExtensionValidator
from django.db import models

# Create your models here.
class Role(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(max_length=500, blank=False)

    def __str__(self):
        return self.name

def sanitize_username(username):
    return re.sub(r'[\\/*?:"<>| ]', '', username)
def generate_unique_cover_image_filename(instance, filename):
    timestamp = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
    extension = os.path.splitext(filename)[1]
    sanitized_username = sanitize_username(instance.username)
    unique_filename = f"{instance.id}_{timestamp}_{uuid.uuid4().hex}{extension}"
    return f"profile_pictures/{instance.id}_{sanitized_username}/{unique_filename}"

class CustomUser(AbstractUser):
    profile_picture = models.ImageField(
        upload_to=generate_unique_cover_image_filename,
        validators=[FileExtensionValidator(allowed_extensions=['png', 'jpg', 'jpeg'])],
        blank=True,
        null=True
    )
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=100, blank=True)
    discord_id = models.CharField(max_length=50, blank=True)
    twitch_url = models.URLField(blank=True)
    is_online = models.BooleanField(default=False)
    status_message = models.CharField(max_length=255, blank=True)
    role = models.ForeignKey(Role, related_name='users', on_delete=models.SET_NULL, null=True, blank=True)
    owned_games = models.ManyToManyField('games.Game', related_name='owners', blank=True)
    wishlist = models.ManyToManyField('games.Game', related_name='wishlist_by', blank=True)
    friends = models.ManyToManyField('self', through='FriendRequest', related_name='friends_set', symmetrical=False)
    added_games = models.ManyToManyField('games.Game', related_name='added_games', blank=True)

    def save(self, *args, **kwargs):
        if self.pk:
            old_profile_picture = CustomUser.objects.get(pk=self.pk).profile_picture
            if old_profile_picture and old_profile_picture != self.profile_picture:
                if os.path.isfile(old_profile_picture.path):
                    os.remove(old_profile_picture.path)

        if not self.role:
            default_role = Role.objects.get(name='User')
            self.role = default_role

        super().save(*args, **kwargs)

class FriendRequest(models.Model):
    sender = models.ForeignKey(CustomUser, related_name='sent_requests', on_delete=models.CASCADE)
    receiver = models.ForeignKey(CustomUser, related_name='received_requests', on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('declined', 'Declined')], default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Friend request from {self.sender.username} to {self.receiver.username} - {self.status}"
