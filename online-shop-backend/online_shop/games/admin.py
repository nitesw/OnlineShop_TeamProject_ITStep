from django.contrib import admin
from .models import Genre, Game, GameImage
from django.contrib.admin import SimpleListFilter
from django.utils.html import format_html

# Register your models here.
@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)
    list_filter = ('name',)

class GenreFilter(SimpleListFilter):
    title = 'Genres'
    parameter_name = 'genres'

    def lookups(self, request, model_admin):
        return [(genre.id, genre.name) for genre in Genre.objects.all()]

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(genres__id=self.value())
        return queryset

@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'release_date', 'developer', 'publisher', 'price', 'discount', 'discounted_price', 'slug')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title', 'genres__name')
    list_filter = (GenreFilter, 'release_date')

    def display_genres(self, obj):
        return ", ".join([genre.name for genre in obj.genres.all()])
    display_genres.short_description = 'Genres'

@admin.register(GameImage)
class GameImageAdmin(admin.ModelAdmin):
    list_display = ('game', 'image_preview', 'alt_text')
    search_fields = ('game__title',)
    list_filter = ('game',)
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="100" height="100" style="object-fit: cover;" draggable="false"/>',
                obj.image.url
            )
        return "No Image"

    image_preview.short_description = 'Image Preview'
    image_preview.allow_tags = True