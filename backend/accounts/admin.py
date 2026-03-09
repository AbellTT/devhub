from django.contrib import admin
from .models import Profile

# Register your models here.

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'developer_level', 'location')
    search_fields = ('user__username', 'bio', 'location')
    list_filter = ('developer_level',)
