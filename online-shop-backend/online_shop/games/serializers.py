from rest_framework import serializers
from .models import Game, GameImage, Genre, Review


class GameImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameImage
        fields = ['id', 'image', 'alt_text']
        read_only_fields = ['id']

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name', 'description']
        read_only_fields = ['id']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'rating', 'created_at', 'review_text', 'get_user_username', 'get_game_title']
        read_only_fields = ['id', 'created_at', 'get_user_username', 'get_game_title']

class GameSerializer(serializers.ModelSerializer):
    images = GameImageSerializer(many=True)
    genres = GenreSerializer(many=True)
    reviews = ReviewSerializer(many=True)

    class Meta:
        model = Game
        fields = ['id', 'title', 'description', 'release_date', 'developer', 'publisher', 'price', 'discount', 'discounted_price', 'average_rating', 'reviews', 'images', 'genres']
        read_only_fields = ['id']