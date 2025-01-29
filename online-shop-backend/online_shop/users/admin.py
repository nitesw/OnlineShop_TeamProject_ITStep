from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Role

# Register your models here.
@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Additional Info', {
            'fields': (
                'profile_picture',
                'bio',
                'location',
                'owned_games',
                'wishlist',
                'added_games',
                'discord_id',
                'twitch_url',
                'is_online',
                'status_message',
                'role',
            ),
        }),
    )
    list_display = ('username', 'email', 'is_online', 'owned_games_count', 'get_wishlist_games_count', 'get_role')
    search_fields = ('username', 'email', 'discord_id', 'location')

    def owned_games_count(self, obj):
        return obj.owned_games.count()
    owned_games_count.short_description = 'Games Count'

    def get_wishlist_games_count(self, obj):
        return obj.wishlist.count()
    get_wishlist_games_count.short_description = 'Wishlist Count'

    def get_role(self, obj):
        return obj.role.name if obj.role else 'No role assigned'
    get_role.short_description = 'Role'

@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)
    list_filter = ('name',)