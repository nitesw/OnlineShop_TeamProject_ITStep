from rest_framework import serializers
from .models import CustomUser
from reviews.serializers import UserReviewSerializer
from games.serializers import GameSerializerForOwnedGames, GameSerializerForWishlist

class CustomUserSerializer(serializers.ModelSerializer):
    reviews = UserReviewSerializer(many=True)
    owned_games = GameSerializerForOwnedGames(many=True)
    wishlist = GameSerializerForWishlist(many=True)
    # friends =

    class Meta:
        model = CustomUser
        fields = [
            'id', 'username', 'profile_picture', 'bio', 'location', 'discord_id', 'twitch_url', 'is_online',
            'status_message', 'role', 'owned_games', 'wishlist', 'reviews'
        ]
        read_only_fields = ['id', 'reviews']