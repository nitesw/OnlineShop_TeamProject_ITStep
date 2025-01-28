from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class Role(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(max_length=500, blank=False)

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
    friends = models.ManyToManyField('self', through='FriendRequest', related_name='friends_set', symmetrical=False)

    def save(self, *args, **kwargs):
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
