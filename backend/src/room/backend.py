from django.contrib.auth.backends import ModelBackend
from .models import ChatRoom

class ChatRoomBackend(ModelBackend):
    def authenticate(self, request, room_code=None, password=None, **kwargs):
        try:
            chat_room = ChatRoom.objects.get(room_code=room_code)
        except ChatRoom.DoesNotExist:
            return None

        if chat_room.check_password(password):
            return chat_room

    def get_user(self, user_id):
        try:
            return ChatRoom.objects.get(pk=user_id)
        except ChatRoom.DoesNotExist:
            return None
