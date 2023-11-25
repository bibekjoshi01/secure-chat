from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from rest_framework.generics import CreateAPIView
from .serializers import *


"""ChatRoom Login View"""


class ChatRoomLoginView(APIView):
    permission_classes = [AllowAny]
    serializer_class = ChatRoomLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid(raise_exception=True):
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)


"""Chat Room Register View"""


class ChatRoomRegisterView(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = ChatRoomRegisterSerializer
