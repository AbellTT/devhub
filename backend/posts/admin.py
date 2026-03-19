from django.contrib import admin
from .models import Post
from .models import Comment

# Register your models here.

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at','published')
    search_fields = ('title', 'content')
    list_filter = ('author', 'created_at')
    def make_published(self,request,queryset):
        queryset.update(published=True)
    actions= ["make_published"]

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('content','author__username','post__author')
    search_fields = ('author','post')
    list_filter = ('author','created')
