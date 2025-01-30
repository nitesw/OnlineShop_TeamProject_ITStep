from rest_framework import serializers
from .models import Game, GameImage, Genre
from reviews.serializers import GameReviewSerializer

class GameImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameImage
        fields = ['id', 'image', 'alt_text']
        read_only_fields = ['id']

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name', 'slug']
        read_only_fields = ['id', 'slug']

class GameSerializer(serializers.ModelSerializer):
    images = GameImageSerializer(many=True)
    genres = GenreSerializer(many=True)
    reviews = GameReviewSerializer(many=True)

    class Meta:
        model = Game
        fields = ['id', 'title', 'cover_image', 'description', 'release_date', 'developer', 'publisher', 'added_by', 'price',
                  'discount', 'discounted_price', 'average_rating', 'slug', 'reviews', 'images', 'genres']
        read_only_fields = ['id']

class GameSerializerForOwnedGames(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['id', 'title', 'cover_image']
        read_only_fields = ['id']

class GameSerializerForWishlist(serializers.ModelSerializer):
    genres = GenreSerializer(many=True)

    class Meta:
        model = Game
        fields = ['id', 'title', 'cover_image', 'release_date', 'price', 'discount', 'discounted_price', 'average_rating', 'genres']
        read_only_fields = ['id']

class GameSerializerForAddedGames(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['id', 'title', 'cover_image', 'release_date', 'average_rating']
        read_only_fields = ['id']