# Generated by Django 5.1.4 on 2025-01-28 00:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_customuser_wishlist'),
    ]

    operations = [
        migrations.AlterField(
            model_name='role',
            name='description',
            field=models.TextField(max_length=500),
        ),
    ]
