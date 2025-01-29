from rest_framework import viewsets, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response

from .models import Game, Genre
from .serializers import GameSerializer, GenreSerializer

# Create your views here.
class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Game.objects.all()
        title = self.request.query_params.get('title', None)
        if title:
            queryset = queryset.filter(title__icontains=title)
        return queryset

    def create(self, request, *args, **kwargs):
        if request.user.role.pk not in [1, 2]:
            return Response(
                {"message": "You must be a seller or an admin to publish games."},
                status=status.HTTP_403_FORBIDDEN,
            )
        request.data['added_by'] = request.user.id
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        print(f"Request User: {self.request.user}")
        game = serializer.save(added_by=self.request.user)
        self.request.user.added_games.add(game)

    def update(self, request, *args, **kwargs):
        game = self.get_object()
        if request.user.role.pk != 1:
            if game.user != request.user:
                return Response(
                    {"message": "You can only edit your own games."},
                    status=status.HTTP_403_FORBIDDEN,
                )
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        game = self.get_object()
        if request.user.role.pk != 1:
            if game.user != request.user:
                return Response(
                    {"message": "You can only delete your own games."},
                    status=status.HTTP_403_FORBIDDEN,
                )
        game.delete()
        return Response({"message": "Game deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)


class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        if request.user.role.pk != 1:
            return Response(
                {"message": "You must be an admin to create a genre."},
                status=status.HTTP_403_FORBIDDEN,
            )
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        if request.user.role.pk != 1:
            return Response(
                {"message": "You must be an admin to edit genres."},
                status=status.HTTP_403_FORBIDDEN,
            )
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        if request.user.role.pk != 1:  # Check if user is not an admin
            return Response(
                {"message": "You must be an admin to delete genres."},
                status=status.HTTP_403_FORBIDDEN,
            )
        return super().destroy(request, *args, **kwargs)