# Generated by Django 4.1.2 on 2022-10-27 10:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('moments', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='follower',
            name='follower',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='moments.profile'),
        ),
    ]
