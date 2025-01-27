from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

# Register your models here.
@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Additional Info', {
            'fields': (
                'profile_picture',
                'bio',
                'location',
                'games_owned',
                'discord_id',
                'twitch_url',
                'is_online',
                'status_message',
                'friends',
            ),
        }),
    )
    list_display = ('username', 'email', 'is_online', 'games_owned')
    search_fields = ('username', 'email', 'discord_id', 'location')