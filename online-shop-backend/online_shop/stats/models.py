from django.db import models
from users.models import CustomUser
from games.models import Game
from reviews.models import Review
from posts.models import Post

# Create your models here.
class Stats(models.Model):
    total_games = models.IntegerField(default=0)
    total_users = models.IntegerField(default=0)
    total_genres = models.IntegerField(default=0)
    total_reviews = models.IntegerField(default=0)
    total_purchases = models.IntegerField(default=0)
    total_posts = models.IntegerField(default=0)

    def update_stats(self):
        self.total_games = Game.objects.count()
        self.total_users = CustomUser.objects.count()
        self.total_genres = Game.objects.values('genres').distinct().count()
        self.total_reviews = Review.objects.count()
        self.total_purchases = sum(user.owned_games.count() for user in CustomUser.objects.all())
        self.total_posts = Post.objects.count()
        self.save()

    def top_users_by_owned_games(self):
        return CustomUser.objects.annotate(num_owned_games=models.Count('owned_games')) \
                   .values('id', 'username', 'profile_picture', 'num_owned_games') \
                   .order_by('-num_owned_games')[:5]

    def top_games_by_sales(self):
        games = Game.objects.annotate(num_sales=models.Count('owners')) \
                    .values('id', 'title', 'cover_image', 'genres', 'price', 'discount') \
                    .order_by('-num_sales')[:10]

        for game in games:
            game_instance = Game.objects.get(id=game['id'])
            game['average_rating'] = game_instance.average_rating()
            game['discounted_price'] = game_instance.discounted_price()

        return games

    def top_genres_by_game_count(self):
        return Game.objects.values('genres__id', 'genres__name') \
                   .annotate(genre_game_count=models.Count('id')) \
                   .order_by('-genre_game_count')[:5]

    def __str__(self):
        return f"Statistics as of {self.updated_at}"

    updated_at = models.DateTimeField(auto_now=True)
