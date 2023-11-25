from django.urls import path, include


urlpatterns = [
    path('room/', include('src.room.urls')),
]