from rest_framework import viewsets
from .models import Review
from .serializers import GameReviewSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.decorators import action

# Create your views here.
class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = GameReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['put', 'patch'], permission_classes=[IsAuthenticatedOrReadOnly])
    def update_review(self, request, pk=None):
        review = self.get_object()
        if review.user != request.user:
            return Response({"detail": "You can only edit your own reviews"}, status=403)
        serializer = self.get_serializer(review, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    @action(detail=True, methods=['delete'], permission_classes=[IsAuthenticatedOrReadOnly])
    def delete_review(self, request, pk=None):
        review = self.get_object()
        if review.user != request.user:
            return Response({"detail": "You can only delete your own reviews"}, status=403)
        review.delete()
        return Response({"detail": "Review deleted successfully"})