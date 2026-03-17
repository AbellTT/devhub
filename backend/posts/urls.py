from django.urls import path
from .views import PostListCreate, PostDetail, CommentListCreate, CommentDetail

urlpatterns = [
    path('', PostListCreate.as_view(), name='post-list'),
    path('<int:pk>/', PostDetail.as_view(), name='post-detail'),
    path('comments/', CommentListCreate.as_view(), name='comment-list'),
    path('comment/<int:pk>/', CommentDetail.as_view(), name='comment-detail')
]
