from rest_framework import generics
from .models import Profile
from .serializers import ProfileSerializer

class ProfileDetail(generics.RetrieveUpdateAPIView):
    """
    Handles GET (view profile) and PUT/PATCH (update profile).
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
