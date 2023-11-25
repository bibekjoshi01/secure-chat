from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import ChatRoom


"""Chat Room Login Serializer"""


class ChatRoomLoginSerializer(serializers.ModelSerializer):
    room_code = serializers.CharField(max_length=12, required=True)
    password = serializers.CharField(required=True, write_only=True)

    class Meta:
        model = ChatRoom
        fields = ["password", "room_code"]

    def validate(self, attrs):
        room_code = attrs.get("room_code", "")
        password = attrs.get("password", "")

        try:
            chat_room = ChatRoom.objects.get(room_code=room_code)
        except ChatRoom.DoesNotExist:
            raise serializers.ValidationError(
                {"message": "Invalid room code or password, try again!"}
            )

        if not chat_room.check_password(password):
            raise serializers.ValidationError(
                {"message": "Invalid Password, try again!"}
            )
        if not ChatRoom.is_active:
            raise serializers.ValidationError({"message": "Room has been Expired !"})

        context = {"request": self.context.get("request")}

        return {
            "room_name": chat_room.name,
            "room_id": chat_room.room_id,
            "tokens": chat_room.tokens,
        }


"""Chat Room Register Serializer"""


class ChatRoomRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=16, min_length=8, required=True, validators=[validate_password]
    )
    name = serializers.CharField(max_length=50)

    class Meta:
        model = ChatRoom
        fields = [
            "password",
            "name",
        ]

    def create(self, validated_data):
        # Generate a unique room ID using uuid
        room_id = str(123535)

        # Create the ChatRoom instance
        room_instance = ChatRoom.objects.create_room(
            password=validated_data["password"],
            room_code=room_id,
            pin_code='122344',
            name=validated_data["name"],
        )

        return room_instance

    def to_representation(self, instance):
        return {"room_code": instance.room_code, "pin_code": instance.pin_code}
