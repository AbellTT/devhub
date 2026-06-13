from django.urls import path
from .views import (
    ProfileDetail, UserRegistrationView, UserLogoutView,
    CustomTokenObtainPairView, ToggleFollowAPIView,
    SuggestedUsersAPIView, SavedPostsAPIView
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('<int:pk>/', ProfileDetail.as_view(), name='profile-detail'),
    path('<int:pk>/follow/', ToggleFollowAPIView.as_view(), name='profile-follow'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', UserRegistrationView.as_view(), name='user_register'),
    path('logout/', UserLogoutView.as_view(), name='user_logout'),
    path('suggestions/', SuggestedUsersAPIView.as_view(), name='user-suggestions'),
    path('saved/', SavedPostsAPIView.as_view(), name='saved-posts'),
]
