from rest_framework import serializers

from .models import Profile, Moment


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['followers_number', 'moments']


class MomentSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='profile', source='author', lookup_field='author')
    class Meta:
        model = Moment
        fields = ['title', 'content', 'author', 'url']

