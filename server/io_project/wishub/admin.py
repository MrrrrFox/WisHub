from django.contrib import admin
from .models import Post, Subject, Domain

#Adding more fancy Admin views
class PostAdmin(admin.ModelAdmin):
    list_display = ('description', 'link', 'author',
                    'subject', 'level', 'created',
                    'num_upvoted', 'num_downvoted')
    list_filter = ('created', 'num_upvoted', 'level', 'author')
    date_hierarchy = 'created'
    ordering = ['-num_upvoted', '-created']

class SubjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'domain')
    list_filter = ('domain',)

class DomainAdmin(admin.ModelAdmin):
    list_display = ('title', )

# Register your models here.
admin.site.register(Post, PostAdmin)
admin.site.register(Domain, DomainAdmin)
admin.site.register(Subject, SubjectAdmin)
