from django.contrib import admin
from .models import Post
from .models import Comment

# Register your models here.

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at')
    search_fields = ('title', 'content')
    list_filter = ('author', 'created_at')

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('content','author__username','post__author')
    search_fields = ('author','post')
    list_filter = ('author','created')
