from rest_framework import serializers
from .models import Stats
from games.serializers import GenreSerializer


class StatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stats
        fields = ['total_games', 'total_users', 'total_genres', 'total_reviews', 'total_purchases', 'total_posts', 'updated_at']

class TopUserSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()
    profile_picture = serializers.CharField()
    num_owned_games = serializers.IntegerField()

class TopGameSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    cover_image = serializers.CharField()
    genres = GenreSerializer(many=True)
    average_rating = serializers.FloatField()
    price = serializers.DecimalField(max_digits=10, decimal_places=2)
    discount = serializers.DecimalField(max_digits=5, decimal_places=2)
    discounted_price = serializers.DecimalField(max_digits=10, decimal_places=2)
    num_sales = serializers.IntegerField()

class TopGenreSerializer(serializers.Serializer):
    genres_id = serializers.IntegerField(source='genres__id')
    genres_name = serializers.CharField(source='genres__name')
    genre_game_count = serializers.IntegerField()

