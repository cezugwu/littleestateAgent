# Generated by Django 5.1.7 on 2025-03-14 08:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('estate', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='email',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
