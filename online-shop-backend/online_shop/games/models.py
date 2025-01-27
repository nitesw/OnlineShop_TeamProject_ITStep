import uuid
import datetime
from django.core.validators import FileExtensionValidator
from django.core.validators import MaxValueValidator
from django.db import models
from django.utils.text import slugify
from decimal import Decimal
import os

# Create your models here.
class Genre(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Game(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True)
    release_date = models.DateField(blank=True, null=True)
    developer = models.CharField(max_length=255, blank=True)
    publisher = models.CharField(max_length=255, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    discount = models.DecimalField(max_digits=5, decimal_places=2, default=0, validators=[MaxValueValidator(Decimal('100'))])
    genres = models.ManyToManyField(Genre, related_name='games', blank=True)
    # TODO: add reviews

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def discounted_price(self):
        price = Decimal(self.price)
        discount = Decimal(self.discount)
        return price - (price * discount / Decimal('100'))

    def __str__(self):
        return self.title

def generate_unique_filename(instance, filename):
    timestamp = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
    extension = os.path.splitext(filename)[1]
    unique_filename = f"{instance.game.id}_{timestamp}_{uuid.uuid4().hex}{extension}"
    return f"game_images/{instance.game.id}/{unique_filename}"

class GameImage(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(
        upload_to=generate_unique_filename,
        validators=[FileExtensionValidator(allowed_extensions=['png', 'jpg', 'jpeg'])]
    )
    alt_text = models.CharField(max_length=255, blank=True, help_text="Alternative text for the image")

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