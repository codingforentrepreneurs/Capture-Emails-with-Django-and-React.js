from rest_framework import serializers


from .models import EmailCapture


class EmailCaptureSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailCapture
        fields = [
            'email',
        ]