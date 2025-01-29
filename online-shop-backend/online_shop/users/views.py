from django.contrib.auth import get_user_model
from rest_framework import viewsets, status, serializers
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser, Role
from games.models import Game
from .serializers import CustomUserSerializer, CustomUserRegistrationSerializer, TokenObtainPairSerializer, \
    WishlistSerializer, OwnedGamesSerializer

# Create your views here.
class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        if user != request.user:
            return Response(
                {"error": "You can only edit your own profile."},
                status=status.HTTP_403_FORBIDDEN,
            )
        return super().update(request, *args, **kwargs)
    def partial_update(self, request, *args, **kwargs):
        user = self.get_object()
        if user != request.user:
            return Response(
                {"error": "You can only edit your own profile."},
                status=status.HTTP_403_FORBIDDEN,
            )
        return super().update(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        if request.user.role.pk != 1:
            return Response(
                {"error": "You must be admin to create user."},
                status=status.HTTP_403_FORBIDDEN,
            )
        return super().create(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        if request.user.role.pk != 1:
            return Response(
                {"error": "You must be admin to delete user."},
                status=status.HTTP_403_FORBIDDEN,
            )
        return super().destroy(request, *args, **kwargs)

class CustomUserRegistrationViewSet(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = CustomUserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            default_role = Role.objects.get(name='User')
            user.role = default_role
            user.save()
            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TokenObtainPairView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = TokenObtainPairSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh_token")
            if not refresh_token:
                return Response({"error": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)

            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Successfully logged out."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class WishlistViewSet(viewsets.ModelViewSet):
    serializer_class = WishlistSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return self.request.user.wishlist.all()

    def perform_create(self, serializer):
        game_id = serializer.validated_data['game_id']
        try:
            game = Game.objects.get(id=game_id)
        except Game.DoesNotExist:
            raise serializers.ValidationError({"error": f"Game ID {game_id} not found"})

        if self.request.user.wishlist.filter(id=game_id).exists():
            raise serializers.ValidationError({"error": "Game already in wishlist"})

        self.request.user.wishlist.add(game)

    def create(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        return Response(
            {"status": "Game added to wishlist"},
            status=status.HTTP_204_NO_CONTENT
        )

    def destroy(self, request, *args, **kwargs):
        game = self.get_object()
        if not request.user.wishlist.filter(id=game.id).exists():
            return Response(
                {"error": "Game not in wishlist"},
                status=status.HTTP_404_NOT_FOUND
            )
        request.user.wishlist.remove(game)
        return Response(
            {"status": "Game removed from wishlist"},
            status=status.HTTP_204_NO_CONTENT
        )

class OwnedGamesViewSet(viewsets.ModelViewSet):
    serializer_class = OwnedGamesSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return self.request.user.owned_games.all()

    def perform_create(self, serializer):
        game_id = serializer.validated_data['game_id']
        try:
            game = Game.objects.get(id=game_id)
        except Game.DoesNotExist:
            raise serializers.ValidationError({"error": f"Game ID {game_id} not found"})

        if self.request.user.owned_games.filter(id=game_id).exists():
            raise serializers.ValidationError({"error": "Game already in owned games"})

        self.request.user.owned_games.add(game)

    def create(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        return Response(
            {"status": "Game added to your games"},
            status=status.HTTP_204_NO_CONTENT
        )

    def update(self, request, *args, **kwargs):
        owned_game = self.get_object()
        if owned_game.user != request.user:
            return Response(
                {"error": "Owned games cannot be updated"},
                status=status.HTTP_405_METHOD_NOT_ALLOWED
            )
        return super().destroy(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        owned_game = self.get_object()
        if owned_game.user != request.user:
            return Response(
                {"error": "Owned games cannot be updated"},
                status=status.HTTP_405_METHOD_NOT_ALLOWED
            )
        return super().destroy(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        owned_game = self.get_object()
        if owned_game.user != request.user:
            return Response(
                {"error": "Owned games cannot be removed"},
                status=status.HTTP_405_METHOD_NOT_ALLOWED
            )
        return super().destroy(request, *args, **kwargs)