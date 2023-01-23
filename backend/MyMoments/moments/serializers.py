from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from rest_framework import serializers

from .models import Profile, Moment, Rate, Comment, Follower, Like


def get_current_profile(serializer_instance):
    request_user = serializer_instance.context['request'].user
    if not request_user.is_authenticated:
        return None
    try:
        profile = Profile.objects.get(user=request_user)
    except Profile.DoesNotExist:
        return None
    return profile


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ("username", "first_name", "last_name")


class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ("id", "avatar", "user", )


class RateSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Rate
        fields = "__all__"


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    comment_author = ProfileSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ("url", "created_date", "text", "comment_author", "id")
        ordering = '-created_date'


class MomentSerializer(serializers.HyperlinkedModelSerializer):
    comments = CommentSerializer(read_only=True, many=True)
    author = ProfileSerializer(read_only=True)
    likes = serializers.ReadOnlyField(source='total_likes')
    is_liked = serializers.SerializerMethodField()
    is_mine = serializers.SerializerMethodField()

    def get_is_liked(self, obj):
        profile = get_current_profile(self)
        if profile is None:
            return False
        obj_type = ContentType.objects.get_for_model(Moment)
        likes = Like.objects.filter(
            content_type=obj_type, object_id=obj.id, liked_user=profile)
        return likes.exists()

    def get_is_mine(self, obj):
        profile = get_current_profile(self)
        if profile is None:
            return False
        return obj.author == profile

    class Meta:
        model = Moment
        # fields = ("moment_id", "")
        fields = ("id", "is_liked", "is_mine", "title", "content", "url", "created_date", "image", "author", "likes", "comments")


class LikeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Like
        fields = "__all__"


class FollowersSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Follower
        fields = "__all__"


class ContentTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ContentType
        fields = "__all__"
