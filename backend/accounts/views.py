from rest_framework import generics , status
from .models import Profile
from .serializers import ProfileSerializer, UserRegistrationSerializer
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User

## the below imports helps in accessing the response in the veiw and dealing with referesh  token blacklisting
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

## the below imports helps in encoding the username and email on the token it self
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer

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
    
class UserLogoutView(APIView):
    def post(self, request):
        try:
            # 1. Get refresh token from request
            refresh_token = request.data["refresh"]
            # 2. Convert it into a token object
            token = RefreshToken(refresh_token)
            # 3. Blacklist it (invalidate it)
            token.blacklist()
            return Response({"message": "Logout successful"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class=CustomTokenObtainPairSerializer