from django.contrib import admin

# Register your models here.
from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Post

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)
    list_filter = ('name',)

class CategoryFilter(admin.SimpleListFilter):
    title = 'Categories'
    parameter_name = 'categories'

    def lookups(self, request, model_admin):
        return [(category.id, category.name) for category in Category.objects.all()]

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(categories__id=self.value())
        return queryset

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'publisher', 'created_at', 'updated_at', 'total_likes', 'cover_image_preview', 'slug')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title', 'publisher__username', 'categories__name')
    list_filter = (CategoryFilter, 'created_at')
    readonly_fields = ('cover_image_preview',)

    def cover_image_preview(self, obj):
        if obj.cover_image:
            return format_html(
                '<img src="{}" height="100" style="object-fit: cover;" draggable="false"/>',
                obj.cover_image.url
            )
        return "No Image"

    cover_image_preview.short_description = 'Cover Image Preview'
    cover_image_preview.allow_tags = True
