from rest_framework import generics

from django.http import HttpRequest
from django.http import HttpResponse


from .models import Profile
from .serializers import ProfileSerializer



# Create your views here.

class ProfileApiView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

def registration(request: HttpRequest):
    login = request.GET.get('login', '1')
    password = request.GET.get('password', 'qwerty12345qwe')
    user = {'username': login,
            'email': f'{login}@gmail.com',
            'password': password,
            'is_staff': True,
            'is_superuser': True
    }
    Profile.objects.create_profile(**user)
    response = HttpResponse(content='ok', status=200)
    # del response['Access-Control-Allow-Origin']
    # response['Access-Control-Allow-Origin'] ='*'
    response['Sec-Fetch-Mode'] = 'no cors'
    return response
