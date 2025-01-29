import datetime
import os
import uuid
import re

from django.core.validators import FileExtensionValidator
from django.db import models
from users.models import CustomUser
from django.utils.text import slugify

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=False)
    slug = models.SlugField(unique=True, blank=True)

    class Meta:
        verbose_name_plural = "Categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

def sanitize_title(title):
    return re.sub(r'[\\/*?:"<>| ]', '', title)
def generate_unique_cover_image_filename(instance, filename):
    timestamp = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
    extension = os.path.splitext(filename)[1]
    sanitized_title = sanitize_title(instance.title)
    unique_filename = f"post_cover_{timestamp}_{uuid.uuid4().hex}{extension}"
    return f"post_covers/{sanitized_title}_{timestamp}/{unique_filename}"

class Post(models.Model):
    title = models.CharField(max_length=255, unique=True)
    cover_image = models.ImageField(upload_to=generate_unique_cover_image_filename,
                                    validators=[FileExtensionValidator(allowed_extensions=['png', 'jpg', 'jpeg'])],
                                    blank=False, null=False)
    slug = models.SlugField(unique=True)
    publisher = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="published_posts")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    description = models.TextField()
    likes = models.ManyToManyField(CustomUser, related_name="liked_posts", blank=True)
    categories = models.ManyToManyField(Category, related_name='posts', blank=False)

    def __str__(self):
        return self.title

    def total_likes(self):
        return self.likes.count()

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
        if self.cover_image:
            self.cover_image.name = generate_unique_cover_image_filename(self, self.cover_image.name)