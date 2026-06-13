from django.urls import path
from .views import (
    PostListCreate, PostDetail, CommentListCreate, CommentDetail,
    ToggleLikeAPIView, ToggleCommentLikeAPIView,
    FollowingFeedAPIView, TrendingTagsAPIView, ToggleSaveAPIView
)

urlpatterns = [
    path('', PostListCreate.as_view(), name='post-list'),
    path('following/', FollowingFeedAPIView.as_view(), name='post-following-feed'),
    path('trending-tags/', TrendingTagsAPIView.as_view(), name='trending-tags'),
    path('<int:pk>/', PostDetail.as_view(), name='post-detail'),
    path('<int:pk>/like/', ToggleLikeAPIView.as_view(), name='post-like'),
    path('<int:pk>/save/', ToggleSaveAPIView.as_view(), name='post-save'),
    path('comments/', CommentListCreate.as_view(), name='comment-list'),
    path('comment/<int:pk>/', CommentDetail.as_view(), name='comment-detail'),
    path('comment/<int:pk>/like/', ToggleCommentLikeAPIView.as_view(), name='comment-like'),
]
