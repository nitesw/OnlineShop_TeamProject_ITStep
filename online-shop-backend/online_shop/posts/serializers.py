from rest_framework import serializers
from .models import Category, Post

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']
        read_only_fields = ['id']

class PostSerializer(serializers.ModelSerializer):
    publisher = serializers.SerializerMethodField()
    categories = CategorySerializer(many=True)

    def get_publisher(self, obj):
        from users.serializers import CustomUserSerializerForLikes
        return CustomUserSerializerForLikes(obj.publisher).data

    class Meta:
        model = Post
        fields = ['id', 'title', 'cover_image', 'created_at', 'updated_at', 'description', 'total_likes', 'publisher', 'categories']
        read_only_fields = ['id']

class PostSerializerForCustomUser(serializers.ModelSerializer):
    categories = CategorySerializer(many=True)

    class Meta:
        model = Post
        fields = ['id', 'title', 'cover_image', 'created_at', 'total_likes', 'categories']
        read_only_fields = ['id']