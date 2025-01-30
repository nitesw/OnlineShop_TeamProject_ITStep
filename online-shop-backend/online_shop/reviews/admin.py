from django.contrib import admin
from .models import Review

# Register your models here.
@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('rating', 'review_text', 'created_at', 'updated_at')
    search_fields = ('review_text',)
    list_filter = ('user__username', 'game__title', 'created_at', 'updated_at', 'rating')