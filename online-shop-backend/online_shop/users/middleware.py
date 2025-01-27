from django.contrib.auth import get_user_model

class UpdateOnlineStatusMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated:
            get_user_model().objects.filter(id=request.user.id).update(is_online=True)

        response = self.get_response(request)
        return response