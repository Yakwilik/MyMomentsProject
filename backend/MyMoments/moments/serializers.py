from rest_framework import serializers

from .models import Profile, Moment


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"


class MomentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Moment
        fields = "__all__"

