from rest_framework import serializers
from .models import Review
from games.models import Game
from users.models import CustomUser

# Reviews for games
class ReviewByUserSerializer(serializers.ModelSerializer):
    reviews_count = serializers.IntegerField(source='reviews.count', read_only=True)
    owned_games_count = serializers.IntegerField(source='owned_games.count', read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'owned_games_count', 'reviews_count', 'profile_picture']

class GameReviewSerializer(serializers.ModelSerializer):
    reviewed_by = ReviewByUserSerializer(source='user', read_only=True)
    # review_for = serializers.PrimaryKeyRelatedField(queryset=Game.objects.all(), source="game")

    class Meta:
        model = Review
        fields = ['id', 'rating', 'created_at', 'review_text', 'reviewed_by']
        read_only_fields = ['id', 'created_at', 'reviewed_by']


# Reviews for user profiles
class ReviewForGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['id', 'title', 'cover_image']

class UserReviewSerializer(serializers.ModelSerializer):
    review_for = ReviewForGameSerializer(source='game')

    class Meta:
        model = Review
        fields = ['id', 'rating', 'created_at', 'review_text', 'review_for']
        read_only_fields = ['id', 'created_at', 'review_for']