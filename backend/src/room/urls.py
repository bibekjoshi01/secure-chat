from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()

urlpatterns = [
    path("login", ChatRoomLoginView.as_view(), name="room_login"),
    path("register", ChatRoomRegisterView.as_view(), name="room_create"),
    path('info/<str:room_code>', ChatRoomInfoView.as_view(), name='chat-room-info'),
]
