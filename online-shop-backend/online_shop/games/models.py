import uuid
import datetime
from django.core.validators import FileExtensionValidator
from django.core.validators import MaxValueValidator
from django.db import models
from django.utils.text import slugify
from decimal import Decimal
import os
from datetime import date
import re

# Create your models here.
class Genre(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=False)
    slug = models.SlugField(unique=True, blank=True)

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
    unique_filename = f"{instance.id}_{timestamp}_{uuid.uuid4().hex}{extension}"
    return f"game_cover/{instance.id}_{sanitized_title}/{unique_filename}"

class Game(models.Model):
    title = models.CharField(max_length=255)
    cover_image = models.ImageField(
        upload_to=generate_unique_cover_image_filename,
        validators=[FileExtensionValidator(allowed_extensions=['png', 'jpg', 'jpeg'])],
        blank=True
    )
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=False)
    release_date = models.DateField(blank=False, null=False, default=date.today)
    developer = models.CharField(max_length=255, blank=False, null=False)
    publisher = models.CharField(max_length=255, blank=False, null=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    discount = models.DecimalField(max_digits=5, decimal_places=2, default=0, validators=[MaxValueValidator(Decimal('100'))])
    genres = models.ManyToManyField(Genre, related_name='games', blank=False)
    added_by = models.ForeignKey('users.CustomUser', related_name='added_by', blank=False, on_delete=models.CASCADE)

    def average_rating(self):
        reviews = self.reviews.all()
        if reviews:
            total = sum([review.rating for review in reviews])
            return total / len(reviews)
        return 0

    def save(self, *args, **kwargs):
        if self.pk:
            old_cover_image = Game.objects.get(pk=self.pk).cover_image
            if old_cover_image and old_cover_image != self.cover_image:
                if os.path.isfile(old_cover_image.path):
                    os.remove(old_cover_image.path)

        if not self.slug:
            self.slug = slugify(self.title)

        super().save(*args, **kwargs)

        if self.cover_image:
            self.cover_image.name = generate_unique_cover_image_filename(self, self.cover_image.name)

    def discounted_price(self):
        price = Decimal(self.price)
        discount = Decimal(self.discount)
        discounted_price = price - (price * discount / Decimal('100'))
        return discounted_price.quantize(Decimal('0.01'))

    def __str__(self):
        return self.title

def generate_unique_filename(instance, filename):
    timestamp = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
    extension = os.path.splitext(filename)[1]
    unique_filename = f"{instance.game.id}_{timestamp}_{uuid.uuid4().hex}{extension}"
    sanitized_title = sanitize_title(instance.game.title)
    return f"game_images/{instance.game.id}_{sanitized_title}/{unique_filename}"

class GameImage(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(
        upload_to=generate_unique_filename,
        validators=[FileExtensionValidator(allowed_extensions=['png', 'jpg', 'jpeg'])],
        blank=True,
        null=True
    )
    alt_text = models.CharField(max_length=255, blank=False, help_text="Alternative text for the image")

    def save(self, *args, **kwargs):
        if self.pk:
            old_image = GameImage.objects.get(pk=self.pk).image
            if old_image and old_image != self.image:
                if os.path.isfile(old_image.path):
                    os.remove(old_image.path)
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        if self.image:
            if os.path.isfile(self.image.path):
                os.remove(self.image.path)
        super().delete(*args, **kwargs)

    def __str__(self):
        return f"Image for {self.game.title}"