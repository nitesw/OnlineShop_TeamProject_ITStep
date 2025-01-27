from rest_framework import viewsets
from .models import Game, Genre
from .serializers import GameSerializer, GenreSerializer

# Create your views here.
class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    def get_queryset(self):
        queryset = Game.objects.all()
        title = self.request.query_params.get('title', None)
        if title:
            queryset = queryset.filter(title__icontains=title)
        return queryset

class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer