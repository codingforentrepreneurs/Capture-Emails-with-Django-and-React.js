from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL

# models.SET_NULL set all foreigns null if Foreign Key Object is deleted
# models.CASCADE - deleted related objects to this foreign key 
# Casade is if user is deleted, so is the instances that relate to it
# models.CASCADE
class EmailCapture(models.Model):
    user            = models.ForeignKey(User, blank=True, null=True, on_delete=models.SET_NULL)
    email           = models.EmailField()
    # verified        = models.BooleanField(default=False)
    timestamp       = models.DateTimeField(auto_now_add=True)
    # updated         = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email