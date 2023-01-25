import http

from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.middleware import csrf
from django.contrib.auth import login as auth_login, logout as auth_logout
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

from .forms import MomentForm
from .models import Profile, Moment, Rate, create_profile, Comment, Like, Follower, add_like, remove_like
from .serializers import *

from django.views.decorators.http import require_POST, require_GET


# Create your views here.
class UserApiView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProfileApiView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


@require_GET
@renderer_classes([JSONRenderer])
@api_view(('GET',))
def get_csrf(request: HttpRequest) -> HttpResponse:
    token = csrf.get_token(request)
    # print(token)
    data = {'token': token}
    response = Response(data=data, status=status.HTTP_200_OK)
    return response


@require_POST
@renderer_classes([JSONRenderer])
@api_view(('POST',))
def registration(request: HttpRequest):
    username = request.POST.get('login', '')
    password = request.POST.get('password', '')
    user = {'username': username,
            'email': f'{username}@gmail.com',
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



@require_POST
@renderer_classes([JSONRenderer])
@api_view(('POST',))
def add_moment(request: HttpRequest):
    # Moment.objects.create(**request.POST)
    moment_form = MomentForm(request.POST, profile=request.user.profile, request=request)
    moment_form.is_valid()
    moment_form.save()
    print(request.FILES)
    print(request.POST.dict())
    return Response()



@require_POST
@renderer_classes([JSONRenderer])
@api_view(('POST',))
def log_out(request: HttpRequest):
    auth_logout(request)
    return Response()


@require_POST
@renderer_classes([JSONRenderer])
@api_view(('POST',))
def login(request: HttpRequest):
    username = request.POST.get('username', '')
    password = request.POST.get('password', '')

    try:
        User.objects.get(username=username)
    except User.DoesNotExist:
        content = {'status': 1, 'message': 'DoesNotExist'}
        response = Response(data=content, status=status.HTTP_200_OK)
        return response
    user = auth.authenticate(request=request, username=username, password=password)
    if user is None:
        content = {'status': 2, 'message': 'BadCredentials'}
        return Response(data=content, status=status.HTTP_200_OK)
    auth_login(request, user)
    content = {'status': 0, 'message': 'Ok'}
    return Response(data=content, status=status.HTTP_200_OK)


class MomentViewSet(viewsets.ModelViewSet):
    queryset = Moment.objects.all()
    serializer_class = MomentSerializer
    permission_classes = [permissions.BasePermission]
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

    @action(methods=['post'], detail=True)
    def like(self, request, pk):
        profile = Profile.objects.get(user=request.user)
        print(profile)
        moment = Moment.objects.get(id=pk)
        print(moment)
        lik, is_created = add_like(moment, profile)
        if not is_created:
            remove_like(moment, profile)
        print(lik)
        return Response()


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
