from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import ChatRoom

# Register the model with the custom admin
admin.site.register(ChatRoom)
    