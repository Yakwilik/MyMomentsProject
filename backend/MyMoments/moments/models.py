import django.contrib.auth.models
from django.contrib import admin
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.contrib.auth.models import User
from django.db.models import Count, Sum, Avg
from datetime import datetime


# Create your models here.


def create_profile(username, email, password, **extra_fields):
    user = User.objects.create_user(username=username, email=email, password=password, **extra_fields)
    user.save()
    profile = Profile(user=user)
    profile.save()


class ProfileManager(models.Manager):
    def get_top_users(self, count=6):
        return self.annotate(answers=Count('answers')).order_by('-answers')[:count]


class Rate(models.Model):
    objects = models.Manager()
    rate = models.IntegerField(validators=[MinValueValidator(0.0), MaxValueValidator(10.0)])
    profile = models.ForeignKey('Profile', on_delete=models.CASCADE)

    def __str__(self):
        return 'Rate of user {0}'.format(Profile.objects.filter(id=self.profile.id).get(user__username=self.profile.user.username))


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=False, related_name='profile')
    avatar = models.ImageField(blank=True, null=True, upload_to="avatar/%Y/%m/%d", default='default_acc.jpeg')
    created_date = models.DateTimeField(auto_now_add=True)

    objects = ProfileManager()

    def average_rate(self):
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

    likes = GenericRelation('Like')

    class Meta:
        ordering = ['-created_date']

    def __str__(self):
        return f'{self.title} {self.content}'

    @property
    def total_likes(self):
        return self.likes.count()

    @property
    def liked_users(self):
        return get_fans(self)

    @property
    def is_liked(self, user):
        if not user.is_authenticated:
            return False
        profile = self.objects.get(user=user)
        obj_type = ContentType.objects.get_for_model(Moment)
        likes = Like.objects.filter(
            content_type=obj_type, object_id=self.id, liked_user=profile)
        return likes.exists()

    def comments(self):
        return Comment.objects.filter(moment__id=self.id)


class Comment(models.Model):
    objects = models.Manager()
    text = models.CharField(max_length=255, blank=False)
    moment = models.ForeignKey(Moment, on_delete=models.CASCADE)
    comment_author = models.ForeignKey(Profile, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.text}'


class Like(models.Model):
    objects = models.Manager()
    liked_user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'like to moment ' \
               f'{Moment.objects.filter(id=self.object_id).first().id} by ' \
               f'{Profile.objects.filter(id=self.liked_user.id).first()}'

    class Meta:
        unique_together = [
            'object_id', 'liked_user', 'content_type'
        ]
        verbose_name = "like"
        verbose_name_plural = "likes"


class Follower(models.Model):
    objects = models.Manager()
    followed_user = models.ForeignKey(Profile, related_name='followed_user', on_delete=models.CASCADE)
    follower = models.ForeignKey(Profile, related_name='follower', on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)

    def clean(self):
        if self.followed_user == self.follower:
            raise ValidationError("You can`t follow yourself")

    def __str__(self):
        return f'user {Profile.objects.filter(id=self.follower.id).first()} ' \
               f'follows {Profile.objects.filter(id=self.followed_user.id).first()}'

    class Meta:
        unique_together = [
            'followed_user', 'follower'
        ]
        verbose_name = "follower"
        verbose_name_plural = "followers"


def add_like(obj, user):
    """Лайкает `obj`.
    """
    obj_type = ContentType.objects.get_for_model(obj)
    like, is_created = Like.objects.get_or_create(
        content_type=obj_type, object_id=obj.id, liked_user=user)
    return like, is_created


def remove_like(obj, user):
    """Удаляет лайк с `obj`.
    """
    obj_type = ContentType.objects.get_for_model(obj)
    Like.objects.filter(
        content_type=obj_type, object_id=obj.id, liked_user=user
    ).delete()


def is_fan(obj, user) -> bool:
    """Проверяет, лайкнул ли `user` `obj`.
    """
    if not user.is_authenticated:
        return False
    obj_type = ContentType.objects.get_for_model(obj)
    likes = Like.objects.filter(
        content_type=obj_type, object_id=obj.id, liked_user=user)
    return likes.exists()


def get_fans(obj):
    """Получает всех пользователей, которые лайкнули `obj`.
    """
    obj_type = ContentType.objects.get_for_model(obj)
    return User.objects.filter(
        likes__content_type=obj_type, likes__object_id=obj.id)
