from rest_framework import viewsets
from rest_framework.response import Response
from .models import Stats
from .serializers import StatsSerializer, TopUserSerializer, TopGameSerializer, TopGenreSerializer

# Create your views here.
class StatsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Stats.objects.all()
    serializer_class = StatsSerializer

    def list(self, request, *args, **kwargs):
        if not Stats.objects.exists():
            Stats.objects.create(
                total_games=0,
                total_users=0,
                total_genres=0,
                total_reviews=0,
                total_purchases=0,
                total_posts=0
            )

        stats = self.get_queryset().first()
        if stats is None:
            return Response({"detail": "No stats found"}, status=404)
        if stats:
            stats.update_stats()

        stats_data = StatsSerializer(stats).data

        top_users = stats.top_users_by_owned_games()
        top_games = stats.top_games_by_sales()
        top_genres = stats.top_genres_by_game_count()

        top_users_serializer = TopUserSerializer(top_users, many=True)
        top_games_serializer = TopGameSerializer(top_games, many=True)
        top_genres_serializer = TopGenreSerializer(top_genres, many=True)

        response_data = {
            "stats": stats_data,
            "top_users": top_users_serializer.data,
            "top_games": top_games_serializer.data,
            "top_genres": top_genres_serializer.data
        }

        return Response(response_data)