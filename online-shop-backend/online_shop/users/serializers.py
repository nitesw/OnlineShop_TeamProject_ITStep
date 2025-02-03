from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import CustomUser, FriendRequest
from reviews.serializers import UserReviewSerializer
from games.serializers import GameSerializerForOwnedGames, GameSerializerForWishlist, GameSerializerForAddedGames
from posts.serializers import PostSerializerForCustomUser
from rest_framework_simplejwt.tokens import RefreshToken

class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'profile_picture']

class CustomUserSerializer(serializers.ModelSerializer):
    reviews = UserReviewSerializer(many=True, required=False)
    owned_games = GameSerializerForOwnedGames(many=True, required=False)
    wishlist = GameSerializerForWishlist(many=True, required=False)
    added_games = GameSerializerForAddedGames(many=True, required=False)
    posts = PostSerializerForCustomUser(many=True, source="published_posts", required=False)
    friends = FriendSerializer(many=True, read_only=True, required=False)

    class Meta:
        model = CustomUser
        fields = [
            'id', 'username', 'email', 'profile_picture', 'bio', 'location', 'discord_id', 'twitch_id', 'is_online',
            'status_message', 'role', 'owned_games', 'wishlist', 'reviews', 'posts', 'added_games', 'friends'
        ]
        read_only_fields = ['id', 'reviews']

class FriendRequestSerializer(serializers.ModelSerializer):
    sender = CustomUserSerializer()
    receiver = CustomUserSerializer()

    class Meta:
        model = FriendRequest
        fields = ['sender', 'receiver', 'status', 'created_at']

class CustomUserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user

class WishlistSerializer(serializers.Serializer):
    game_id = serializers.IntegerField(required=True)

class OwnedGamesSerializer(serializers.Serializer):
    game_id = serializers.IntegerField(required=True)

class CustomUserSerializerForLikes(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'profile_picture']

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role.name
        token['username'] = user.username
        user.is_online = True
        user.save(update_fields=['is_online'])
        return token