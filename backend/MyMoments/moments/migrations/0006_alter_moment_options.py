# Generated by Django 4.1.5 on 2023-01-25 20:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('moments', '0005_alter_like_unique_together'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='moment',
            options={'ordering': ['-created_date']},
        ),
    ]
