from rest_framework import generics
from .models import Post
from .serializers import PostSerializer
from .models import Comment
from .serializers import CommentSerializer

class PostListCreate(generics.ListCreateAPIView):
    """
    Handles GET (list) and POST (create) for Posts.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Handles GET (detail), PUT (update), and DELETE for a single Post.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class CommentListCreate(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    
