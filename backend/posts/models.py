from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    title = models.CharField(max_length=200, blank=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published = models.BooleanField(default=False)
    tags = models.JSONField(default=list, blank=True)
    badge = models.CharField(max_length=100, blank=True)
    
    # 🌟 The correct way to store likes:
    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)

    def total_likes(self):
        return self.likes.count()

    def __str__(self):
        return self.title if self.title else f"Post by {self.author.username}"

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_comments")
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    
    # 🌟 Same for comment likes
    likes = models.ManyToManyField(User, related_name='liked_comments', blank=True)

    def total_likes(self):
        return self.likes.count()

    def __str__(self):
        return self.content[:50]
