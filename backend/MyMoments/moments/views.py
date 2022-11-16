import http

from django.db import IntegrityError
from rest_framework import generics, viewsets

from django.http import HttpRequest
from django.http import HttpResponse
from rest_framework.decorators import renderer_classes, api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.renderers import JSONRenderer
from rest_framework import permissions

from .models import Profile, Moment
from .serializers import ProfileSerializer, MomentSerializer

from django.views.decorators.http import require_POST



# Create your views here.

class ProfileApiView(generics.ListAPIView):
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
        Profile.objects.create_profile(**user)
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
