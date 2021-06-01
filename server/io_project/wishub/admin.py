from django.contrib import admin
from .models import Post, Subject, Domain, Comment
from django.urls import include, path


# Adding more fancy Admin views
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'description', 'link', 'author',
                    'subject', 'level', 'created',
                    'num_upvoted', 'num_downvoted')
    list_filter = ('created', 'num_upvoted', 'level', 'author')
    date_hierarchy = 'created'
    ordering = ['-num_upvoted', '-created']


class SubjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'domain')
    list_filter = ('domain',)


class DomainAdmin(admin.ModelAdmin):
    list_display = ('id', 'title',)

class CommentAdmin(admin.ModelAdmin):
    list_display = ('id','body', 'author', 'post', 'created_date', 'approved_comment')



# Register your models here.


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/users/', include('users.urls')),
]
admin.site.register(Post, PostAdmin)
admin.site.register(Domain, DomainAdmin)
admin.site.register(Subject, SubjectAdmin)
admin.site.register(Comment, CommentAdmin)
