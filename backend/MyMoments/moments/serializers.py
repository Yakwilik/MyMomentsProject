from django.contrib.contenttypes.models import ContentType
from rest_framework import serializers

from .models import Profile, Moment, Rate, Comment, Follower, Like


class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"


class MomentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Moment
        fields = "__all__"


class RateSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Rate
        fields = "__all__"


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"


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