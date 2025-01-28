from django.db import models

# Create your models here.

class Review(models.Model):
    rating = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    review_text = models.TextField(blank=True)
    user = models.ForeignKey('users.CustomUser', related_name='reviews', on_delete=models.CASCADE)
    game = models.ForeignKey('games.Game', related_name='reviews', on_delete=models.CASCADE)

    def __str__(self):
        return f"Review by {self.user.username} for {self.game.title}"