import django.contrib.auth.models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.contrib.auth.models import User
from django.db.models import Count, Sum, Avg
from datetime import datetime

# Create your models here.


class ProfileManager(models.Manager):
    def get_top_users(self, count=6):
        return self.annotate(answers=Count('answers')).order_by('-answers')[:count]

    def create_profile(self, username, email, password, **extra_fields):
        user = User.objects.create_user(username=username, email=email, password=password, **extra_fields)
        user.save()
        profile = Profile(user=user)
        profile.save()

class Rate(models.Model):
    rate = models.IntegerField(validators=[MinValueValidator(0.0), MaxValueValidator(10.0)])
    profile = models.ForeignKey('Profile', on_delete=models.CASCADE)
    def __str__(self):
        return 'Rate of user {0}'.format(Profile.objects.filter(user__id=self.id).get(user__login=self.login))


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=False, related_name='profile')
    avatar = models.ImageField(blank=True, null=True, upload_to="avatar/%Y/%m/%d", default='default_acc.jpeg')
    created_date = models.DateTimeField(auto_now_add=True)

    followers = models.ManyToManyField('Follower', related_name='followers', blank=True, symmetrical=False)
    objects = ProfileManager()

    def avergate_rate(self):
        return Rate.objects.filter(profile__id=self.id).aggregate(Avg('rate'))

    def __str__(self):
        return self.user.username

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"


def author_directory_path(instance, filename):
    return 'user_{0}/{1}/{2}/{3}/{4}'.format(instance.author.id,
                                             datetime.now().year,
                                             datetime.now().month,
                                             datetime.now().day,
                                             filename)


class MomentManager(models.Manager):
    pass

class Moment(models.Model):
    objects = MomentManager()
    title = models.CharField(max_length=255, blank=True)
    content = models.TextField(blank=True)

    author = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='author')
    created_date = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to=author_directory_path)
    tags = models.ManyToManyField('Tag', 'tags')

    def likes(self):
        return Like.objects.filter(moment__id=self.id).filter(moment__author__id=self.author.id).count()

    def comments(self):
        return Comment.objects.filter(moment__id=self.id).filter(moment__author__id=self.author.id)


class Comment(models.Model):
    objects = models.Manager()
    text = models.CharField(max_length=255, blank=False)
    moment = models.ForeignKey(Moment, on_delete=models.CASCADE)
    comment_author = models.ForeignKey(Profile, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)

class Like(models.Model):
    like_author = models.ForeignKey(Profile, on_delete=models.CASCADE)
    moment = models.ForeignKey(Moment, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
#     TODO: unique_together
    class Meta:
        unique_together = [
            ['moment', 'like_author']
        ]




class Follower(models.Model):
    follower = models.ForeignKey(Profile, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)

class Tag(models.Model):
    tag_name = models.CharField(max_length=254, unique=True)

