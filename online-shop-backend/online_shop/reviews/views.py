from rest_framework import viewsets, status
from .models import Review
from .serializers import GameReviewSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = GameReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        request.data.pop('reviewed_by', None)
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        review = self.get_object()
        if review.user != request.user:
            return Response(
                {"detail": "You can only edit your own reviews."},
                status=status.HTTP_403_FORBIDDEN,
            )
        request.data.pop('reviewed_by', None)
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        review = self.get_object()
        if review.user != request.user:
            return Response(
                {"detail": "You can only delete your own reviews."},
                status=status.HTTP_403_FORBIDDEN,
            )
        super().destroy(request, *args, **kwargs)
        return Response(
            {"status": "Review was successfully deleted."},
            status=status.HTTP_204_NO_CONTENT
        )