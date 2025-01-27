from rest_framework import serializers
from .models import Game, GameImage, Genre

class GameImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameImage
        fields = ['image', 'alt_text']

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name', 'description']
        read_only_fields = ['id']

class GameSerializer(serializers.ModelSerializer):
    images = GameImageSerializer(many=True)
    genres = GenreSerializer(many=True)

    class Meta:
        model = Game
        fields = ['id', 'title', 'description', 'release_date', 'developer', 'publisher', 'price', 'images', 'genres']
        read_only_fields = ['id']