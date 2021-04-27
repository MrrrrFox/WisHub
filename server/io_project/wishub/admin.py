from django.contrib import admin
from .models import Post, Subject, Domain

# Register your models here.
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/users/', include('users.urls')),
]
admin.site.register(Post)
admin.site.register(Domain)
admin.site.register(Subject)
