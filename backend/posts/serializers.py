from rest_framework import serializers
from .models import Post, Comment


class PostSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.username')
    has_liked = serializers.SerializerMethodField()
    is_saved = serializers.SerializerMethodField()
    No_comments = serializers.SerializerMethodField()
    shares = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            'id', 'author', 'author_name', 'title', 'content',
            'created_at', 'published', 'total_likes', 'tags', 'badge',
            'has_liked', 'is_saved', 'No_comments', 'shares'
        ]
        read_only_fields = ['author']

    def get_has_liked(self, obj):
        request = self.context.get('request')
        if request and hasattr(request, 'user') and request.user.is_authenticated:
            return obj.likes.filter(id=request.user.id).exists()
        return False

    def get_is_saved(self, obj):
        request = self.context.get('request')
        if request and hasattr(request, 'user') and request.user.is_authenticated:
            try:
                return request.user.profile.saved_posts.filter(id=obj.id).exists()
            except Exception:
                return False
        return False

    def get_No_comments(self, obj):
        return obj.comments.count()

    def get_shares(self, obj):
        # Placeholder: Returns 0 for now until we build a database table for tracking shares!
        return 0


class CommentSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.username')
    has_liked = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'author', 'post', 'content', 'author_name', 'created', 'total_likes', 'has_liked']
        read_only_fields = ['author']

    def get_has_liked(self, obj):
        request = self.context.get('request')
        if request and hasattr(request, 'user') and request.user.is_authenticated:
            return obj.likes.filter(id=request.user.id).exists()
        return False
