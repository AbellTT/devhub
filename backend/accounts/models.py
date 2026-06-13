from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True, null=True)
    developer_level = models.CharField(max_length=50, blank=True)
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)
    location = models.CharField(max_length=100, blank=True)

    # 🔗 Follow System: tracks who this user is following (self-referential)
    following = models.ManyToManyField(
        'self',
        symmetrical=False,
        blank=True,
        related_name='followers'
    )

    # 🔖 Saved Posts: posts the user has bookmarked
    saved_posts = models.ManyToManyField(
        'posts.Post',
        blank=True,
        related_name='saved_by'
    )

    def __str__(self):
        return f"{self.user.username}'s Profile"

# 🚀 SIGNALS: Automatically create a Profile when a User is created
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
