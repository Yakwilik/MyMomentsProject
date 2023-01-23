import http

from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.db import IntegrityError
from rest_framework import generics, viewsets

from django.http import HttpRequest
from django.http import HttpResponse
from rest_framework.decorators import renderer_classes, api_view, action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.renderers import JSONRenderer
from rest_framework import permissions

from .models import Profile, Moment, Rate, create_profile, Comment, Like, Follower
from .serializers import *

from django.views.decorators.http import require_POST


# Create your views here.
class UserApiView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProfileApiView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


@require_POST
@renderer_classes([JSONRenderer])
@api_view(('POST',))
def registration(request: HttpRequest):
    login = request.POST.get('login', '')
    password = request.POST.get('password', '')
    user = {'username': login,
            'email': f'{login}@gmail.com',
            'password': password,
            'is_staff': True,
            'is_superuser': True
    }
    try:
        create_profile(**user)
    except IntegrityError as e:
        content = {'status': 1, 'error': e.__str__()}
        return Response(data=content, status=status.HTTP_400_BAD_REQUEST)

    content = {'status': 0}
    response = HttpResponse(content=content, status=status.HTTP_201_CREATED)
    response['Sec-Fetch-Mode'] = 'no cors'
    return response


class MomentViewSet(viewsets.ModelViewSet):
    queryset = Moment.objects.all()
    serializer_class = MomentSerializer
    permission_classes = [permissions.AllowAny]
    # moment
    # comment_author

    @action(methods=['get'], detail=True)
    def comments(self, request, pk=None):
        if pk is None:
            return Response({'comments': [c.text for c in Comment.objects.all()]})
        comms = Comment.objects.filter(moment__id=pk)
        return Response({'comments': [{'text': c.text,
                                       'author_id': c.comment_author.id,
                                       'date': c.created_date,
                                       'id': c.id} for c in comms]})


class RateViewSet(viewsets.ModelViewSet):
    queryset = Rate.objects.all()
    serializer_class = RateSerializer
    permission_classes = [permissions.AllowAny]


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.AllowAny]


class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [permissions.AllowAny]


class FollowerViewSet(viewsets.ModelViewSet):
    queryset = Follower.objects.all()
    serializer_class = FollowersSerializer
    permission_classes = [permissions.AllowAny]


class ContentTypeViewSet(viewsets.ModelViewSet):
    queryset = ContentType.objects.all()
    serializer_class = ContentTypeSerializer
    permission_classes = [permissions.AllowAny]
