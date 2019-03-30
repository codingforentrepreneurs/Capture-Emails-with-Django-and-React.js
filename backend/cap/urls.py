"""cap URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/dev/topics/http/urls/
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
from django.conf import settings
from django.contrib import admin
from django.views.generic import TemplateView
from django.urls import path, re_path

from captures.views import (
    csrf_token_view,
    EmailCaptureCreateAPIView
)

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^$', TemplateView.as_view(template_name='home.html')),
    re_path(r'^api/capture/email/$', EmailCaptureCreateAPIView.as_view()),
    re_path(r'^api/capture/token/$', csrf_token_view),
]


if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)






