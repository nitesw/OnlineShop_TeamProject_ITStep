"""
URL configuration for online_shop project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from games.views import GameViewSet, GenreViewSet
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenRefreshView
from users.views import CustomUserRegistrationViewSet, TokenObtainPairView, LogoutView, CustomUserViewSet, WishlistViewSet, OwnedGamesViewSet
from reviews.views import ReviewViewSet
from posts.views import PostViewSet
from stats.views import StatsViewSet

router = DefaultRouter()
router.register(r'games', GameViewSet, basename='game')
router.register(r'genres', GenreViewSet, basename='genre')
router.register(r'users', CustomUserViewSet, basename='user')
router.register(r'wishlist', WishlistViewSet, basename='wishlist')
router.register(r'reviews', ReviewViewSet, basename='reviews')
router.register(r'owned-games', OwnedGamesViewSet, basename='owned-game')
router.register(r'posts', PostViewSet, basename='post')
router.register(r'stats', StatsViewSet, basename='stat')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/register/', CustomUserRegistrationViewSet.as_view(), name='register'),
    path('api/login/', TokenObtainPairView.as_view(), name='login'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)