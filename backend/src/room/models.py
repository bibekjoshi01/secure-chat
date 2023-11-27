import uuid
from config import settings
from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import Group, Permission
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager


def validate_image(image):
    file_size = image.size
    limit_byte_size = settings.MAX_UPLOAD_SIZE
    if file_size > limit_byte_size:
        # converting into kb
        f = limit_byte_size / 1024
        # converting into MB
        f = f / 1024
        raise ValidationError("Max size of file is %s MB" % f)


class ChatRoomManager(BaseUserManager):
    def create_room(self, room_code, name=None, password=None, **extra_fields):
        room = self.model(room_code=room_code, name=name, **extra_fields)
        room.set_password(password)  # Use set_password to hash the password
        room.save(using=self._db)
        return room

    def create_superuser(self, room_code, name=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_room(room_code, name, password, **extra_fields)


class ChatRoom(AbstractBaseUser, PermissionsMixin):
    room_id = models.UUIDField(unique=True, editable=False, default=uuid.uuid4)
    room_code = models.CharField(max_length=12, unique=True)
    pin_code = models.CharField(max_length=6, blank=True, null=True)
    name = models.CharField(max_length=50, null=True, blank=True)
    max_members = models.PositiveIntegerField(default=16, null=True, blank=True)
    photo = models.ImageField(validators=[validate_image], blank=True, null=True)

    is_superuser = models.BooleanField(
        _("superuser status"),
        default=False,
        help_text=_("Designates whether the room is superuser"),
    )
    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_("Designates whether the room can log into this admin site."),
    )
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "Designates whether this room should be treated as active. "
            "Unselect this instead of deleting accounts."
        ),
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    groups = models.ManyToManyField(Group, related_name="chat_rooms", blank=True)
    user_permissions = models.ManyToManyField(
        Permission, related_name="chat_rooms", blank=True
    )

    objects = ChatRoomManager()

    USERNAME_FIELD = "room_code"
    REQUIRED_FIELDS = ["name"]

    class Meta:
        ordering = ["-id"]
        verbose_name = _("Chat Room")
        verbose_name_plural = _("Chat Rooms")

    def __str__(self):
        return str(self.name + " " + self.room_code)

    @property
    def tokens(self, request=None):
        refresh = RefreshToken.for_user(self)
        return {"refresh": str(refresh), "access": str(refresh.access_token)}

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
