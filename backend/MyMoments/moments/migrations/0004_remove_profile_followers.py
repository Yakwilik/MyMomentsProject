# Generated by Django 4.1.3 on 2022-11-18 07:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('moments', '0003_alter_follower_options_alter_like_options'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='followers',
        ),
    ]
