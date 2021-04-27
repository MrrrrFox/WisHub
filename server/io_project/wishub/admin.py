from django.contrib import admin
from .models import Post, Subject, Domain

# Register your models here.
admin.site.register(Post)
admin.site.register(Domain)
admin.site.register(Subject)
