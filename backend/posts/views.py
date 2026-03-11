from rest_framework import generics
from .models import Post
from .serializers import PostSerializer

class PostListCreate(generics.ListCreateAPIView):
    """
    Handles GET (list) and POST (create) for Posts.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Handles GET (detail), PUT (update), and DELETE for a single Post.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
