from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import CustomUser
from reviews.serializers import UserReviewSerializer
from games.serializers import GameSerializerForOwnedGames, GameSerializerForWishlist, GameSerializerForAddedGames
from posts.serializers import PostSerializerForCustomUser
from rest_framework_simplejwt.tokens import RefreshToken

class CustomUserSerializer(serializers.ModelSerializer):
    reviews = UserReviewSerializer(many=True)
    owned_games = GameSerializerForOwnedGames(many=True)
    wishlist = GameSerializerForWishlist(many=True)
    added_games = GameSerializerForAddedGames(many=True)
    posts = PostSerializerForCustomUser(many=True, source="published_posts")
    # friends =

    class Meta:
        model = CustomUser
        fields = [
            'id', 'username', 'email', 'profile_picture', 'bio', 'location', 'discord_id', 'twitch_url', 'is_online',
            'status_message', 'role', 'owned_games', 'wishlist', 'reviews', 'posts', 'added_games'
        ]
        read_only_fields = ['id', 'reviews']

class CustomUserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user

class TokenObtainPairSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        from django.contrib.auth import authenticate
        user = authenticate(username=attrs['username'], password=attrs['password'])
        if not user:
            raise serializers.ValidationError("Invalid credentials.")

        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

class WishlistSerializer(serializers.Serializer):
    game_id = serializers.IntegerField(required=True)

class OwnedGamesSerializer(serializers.Serializer):
    game_id = serializers.IntegerField(required=True)

class CustomUserSerializerForLikes(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'profile_picture']