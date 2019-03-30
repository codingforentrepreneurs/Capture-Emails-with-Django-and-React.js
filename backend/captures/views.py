from django.middleware.csrf import get_token
from django.http import JsonResponse

from rest_framework import authentication, generics, permissions

from .models import EmailCapture
from .serializers import EmailCaptureSerializer

def csrf_token_view(request):
    token = get_token(request)
    return JsonResponse({'csrfToken': token})

# django corsheaders cfe.sh
class EmailCaptureCreateAPIView(generics.CreateAPIView):
    queryset            = EmailCapture.objects.all()
    serializer_class    = EmailCaptureSerializer
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.AllowAny]
    def perform_create(self, serializer):
        request = self.request
        user = request.user
        if not user.is_authenticated:
            user = None # Annon User
        serializer.save(user=user)