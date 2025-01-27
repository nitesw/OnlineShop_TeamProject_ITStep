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
                'games_owned',
                'discord_id',
                'twitch_url',
                'is_online',
                'status_message',
                'role',
            ),
        }),
    )
    list_display = ('username', 'email', 'is_online', 'games_owned', 'get_role')
    search_fields = ('username', 'email', 'discord_id', 'location')

    def get_role(self, obj):
        return obj.role.name if obj.role else 'No role assigned'
    get_role.short_description = 'Role'

@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)
    list_filter = ('name',)