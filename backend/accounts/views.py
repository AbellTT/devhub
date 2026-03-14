from rest_framework import generics
from .models import Profile
from .serializers import ProfileSerializer, UserRegistrationSerializer
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User

class ProfileDetail(generics.RetrieveUpdateAPIView):
    """
    Handles GET (view profile) and PUT/PATCH (update profile).
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = (AllowAny,)
