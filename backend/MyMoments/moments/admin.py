from django.contrib import admin

# Register your models here.


from .models import Profile, Rate, Moment, Like, Comment, Follower

admin.site.register(Profile)
admin.site.register(Rate)
admin.site.register(Moment)
admin.site.register(Like)
admin.site.register(Comment)
admin.site.register(Follower)
