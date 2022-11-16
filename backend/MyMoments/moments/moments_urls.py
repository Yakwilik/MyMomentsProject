from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'moments', views.MomentViewSet)

urlpatterns = [

    # path('ask/', views.ask, name="ask"),
    # path('login/', views.login, name="login"),
    # path('signup/<str:login>', views.registration, name="registration"),
    path('signup/', views.registration, name="registration"),
    path('', include(router.urls), name="api")
    # path('settings/', views.settings, name="settings"),
    # path('hot/', views.hot, name="hot_question"),
    # path('tag/<str:tag>', views.tag_listing, name="tag"),
    # path('<int:i>/', views.question, name="question"),

]