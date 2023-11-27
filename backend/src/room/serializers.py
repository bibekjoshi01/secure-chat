import random
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
    max_members = serializers.IntegerField(required=True)

    class Meta:
        model = ChatRoom
        fields = ["password", "name", "max_members"]

    def validate_max_members(self, max_members):
        if max_members <= 0:
            raise serializers.ValidationError(
                {"message": "Please enter valid number of members!"}
            )

    def generate_unique_room_code(self):
        while True:
            # Generate a 12-digit room code
            room_code = "".join(str(random.randint(0, 9)) for _ in range(12))

            # Check if the room code already exists
            if not ChatRoom.objects.filter(room_code=room_code).exists():
                return room_code

    def create(self, validated_data):
        # Generate a unique room code
        room_code = self.generate_unique_room_code()

        if 'max_members' not in validated_data:
            raise serializers.ValidationError("Hello !")

        # Generate a random 6-digit pin code
        pin_code = str(random.randint(100000, 999999))

        # Create the ChatRoom instance
        room_instance = ChatRoom.objects.create_room(
            password=validated_data["password"],
            room_code=room_code,
            pin_code=pin_code,
            name=validated_data["name"],
            max_members=validated_data["max_members"],
        )

        return room_instance

    def to_representation(self, instance):
        return {
            "message": "Room Created Successfully!",
            "data": {
                "room_name": instance.name,
                "room_code": instance.room_code,
                "pin_code": instance.pin_code,
                "max_members": instance.max_members,
            },
        }
