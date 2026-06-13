from rest_framework import generics, status
from .models import Profile
from .serializers import ProfileSerializer, UserRegistrationSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
import random


class ProfileDetail(generics.RetrieveUpdateAPIView):
    """
    GET  /api/v1/accounts/<pk>/  — view any profile
    PUT/PATCH /api/v1/accounts/<pk>/ — update own profile
    """
    queryset = Profile.objects.select_related('user').all()
    serializer_class = ProfileSerializer


class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = (AllowAny,)


class UserLogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logout successful"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class ToggleFollowAPIView(APIView):
    """
    POST /api/v1/accounts/<pk>/follow/
    Toggles the current user following the profile with the given pk.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            target_profile = Profile.objects.get(pk=pk)
        except Profile.DoesNotExist:
            return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)

        my_profile = request.user.profile

        # Prevent following yourself
        if target_profile == my_profile:
            return Response({"error": "You cannot follow yourself"}, status=status.HTTP_400_BAD_REQUEST)

        if my_profile.following.filter(pk=target_profile.pk).exists():
            my_profile.following.remove(target_profile)
            is_following = False
        else:
            my_profile.following.add(target_profile)
            is_following = True

        return Response({
            "is_following": is_following,
            "followers_count": target_profile.followers.count()
        }, status=status.HTTP_200_OK)


class SuggestedUsersAPIView(APIView):
    """
    GET /api/v1/accounts/suggestions/
    Returns up to 5 random users the current user is not already following.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        my_profile = request.user.profile
        already_following_ids = my_profile.following.values_list('id', flat=True)

        # Exclude self and already-followed profiles
        candidates = Profile.objects.select_related('user').exclude(
            pk__in=already_following_ids
        ).exclude(pk=my_profile.pk)

        candidate_list = list(candidates)
        sample = random.sample(candidate_list, min(5, len(candidate_list)))

        serializer = ProfileSerializer(sample, many=True, context={'request': request})
        return Response(serializer.data)


class SavedPostsAPIView(APIView):
    """
    GET /api/v1/accounts/saved/
    Returns all posts saved by the current user.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        from posts.serializers import PostSerializer
        saved = request.user.profile.saved_posts.all().order_by('-created_at')
        serializer = PostSerializer(saved, many=True, context={'request': request})
        return Response(serializer.data)