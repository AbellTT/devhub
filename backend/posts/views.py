from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter, OrderingFilter
from django.shortcuts import get_object_or_404
from django.db.models import Count
from collections import Counter
import json

from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer


class PostListCreate(generics.ListCreateAPIView):
    """
    GET  /api/v1/posts/          — list all posts (supports ?search= and ?ordering=)
    POST /api/v1/posts/          — create a new post
    """
    serializer_class = PostSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['title', 'content', 'tags']
    ordering_fields = ['created_at', 'likes_count']
    ordering = ['-created_at']  # default: newest first

    def get_queryset(self):
        return Post.objects.annotate(likes_count=Count('likes'))

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    GET    /api/v1/posts/<pk>/  — post detail
    PUT    /api/v1/posts/<pk>/  — update post
    DELETE /api/v1/posts/<pk>/  — delete post
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class FollowingFeedAPIView(generics.ListAPIView):
    """
    GET /api/v1/posts/following/
    Returns posts from users the current user follows.
    """
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        try:
            following_profiles = self.request.user.profile.following.all()
            following_users = [p.user for p in following_profiles]
            return Post.objects.filter(author__in=following_users).order_by('-created_at')
        except Exception:
            return Post.objects.none()


class TrendingTagsAPIView(APIView):
    """
    GET /api/v1/posts/trending-tags/
    Returns the top 10 tags by frequency across all posts.
    """
    def get(self, request):
        all_tags = Post.objects.exclude(tags=[]).values_list('tags', flat=True)
        tag_counter = Counter()
        for tag_list in all_tags:
            if isinstance(tag_list, list):
                for tag in tag_list:
                    if tag:
                        tag_counter[tag.strip().lower()] += 1
            elif isinstance(tag_list, str):
                try:
                    parsed = json.loads(tag_list)
                    for tag in parsed:
                        if tag:
                            tag_counter[tag.strip().lower()] += 1
                except Exception:
                    pass

        top_tags = [
            {"tag": tag, "count": count}
            for tag, count in tag_counter.most_common(10)
        ]
        return Response(top_tags)


class ToggleSaveAPIView(APIView):
    """
    POST /api/v1/posts/<pk>/save/
    Toggles the requesting user's save status on a specific post.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        profile = request.user.profile

        if profile.saved_posts.filter(pk=post.pk).exists():
            profile.saved_posts.remove(post)
            is_saved = False
        else:
            profile.saved_posts.add(post)
            is_saved = True

        return Response({"is_saved": is_saved}, status=status.HTTP_200_OK)


class CommentListCreate(generics.ListCreateAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        post_id = self.request.query_params.get('post')
        if post_id:
            return Comment.objects.filter(post_id=post_id).order_by('created')
        return Comment.objects.all().order_by('created')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class ToggleLikeAPIView(APIView):
    """
    Toggles the requesting user's like status on a specific post.
    Endpoint: POST /api/v1/posts/<pk>/like/
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        post = get_object_or_404(Post, pk=pk)

        if request.user in post.likes.all():
            post.likes.remove(request.user)
            has_liked = False
        else:
            post.likes.add(request.user)
            has_liked = True

        return Response({
            "has_liked": has_liked,
            "total_likes": post.total_likes()
        }, status=status.HTTP_200_OK)


class ToggleCommentLikeAPIView(APIView):
    """
    Toggles the requesting user's like status on a specific comment.
    Endpoint: POST /api/v1/posts/comment/<pk>/like/
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        comment = get_object_or_404(Comment, pk=pk)

        if request.user in comment.likes.all():
            comment.likes.remove(request.user)
            has_liked = False
        else:
            comment.likes.add(request.user)
            has_liked = True

        return Response({
            "has_liked": has_liked,
            "total_likes": comment.total_likes()
        }, status=status.HTTP_200_OK)
