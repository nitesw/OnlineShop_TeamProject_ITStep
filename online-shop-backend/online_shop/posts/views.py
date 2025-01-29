from django.shortcuts import render
from django.utils.dateparse import parse_date
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from .models import Category, Post
from .serializers import CategorySerializer, PostSerializer

# Create your views here.
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        if request.user.role.pk != 1:
            return Response(
                {"message": "You must be an admin to create a category."},
                status=status.HTTP_403_FORBIDDEN,
            )
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        if request.user.role.pk != 1:
            return Response(
                {"message": "You must be an admin to edit categories."},
                status=status.HTTP_403_FORBIDDEN,
            )
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        if request.user.role.pk != 1:
            return Response(
                {"message": "You must be an admin to delete categories."},
                status=status.HTTP_403_FORBIDDEN,
            )
        return super().destroy(request, *args, **kwargs)

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Post.objects.all()
        created_at = self.request.query_params.get('created_at', None)
        if created_at:
            parsed_date = parse_date(created_at)
            if parsed_date:
                queryset = queryset.filter(created_at__date=parsed_date)
        return queryset

    def perform_create(self, serializer):
        serializer.save(publisher=self.request.publisher)

    def update(self, request, *args, **kwargs):
        post = self.get_object()
        if request.publisher.role.pk != 1:
            if post.publisher != request.publisher:
                return Response(
                    {"message": "You can only edit your own posts."},
                    status=status.HTTP_403_FORBIDDEN,
                )
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        post = self.get_object()
        if request.publisher.role.pk != 1:
            if post.publisher != request.publisher:
                return Response(
                    {"message": "You can only delete your own posts."},
                    status=status.HTTP_403_FORBIDDEN,
                )
        post.delete()
        return Response({"message": "Post deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)