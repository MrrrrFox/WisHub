from django.urls import include, path
from rest_framework import routers
from . import views

# TO DO: Read more about the router
router = routers.DefaultRouter()
router.register(r'posts', views.PostViewSet)
router.register(r'subjects', views.SubjectViewSet)
router.register(r'domains', views.DomainViewSet)
router.register(r'comments', views.CommentViewSet)

app_name = 'wishub'
urlpatterns = [
    # new views
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls',
                              namespace='rest_framework')),
    path('contact-admin/', views.MessageAdmin.as_view()),
    path('user-voted-posts', views.UserVoted.as_view()),
    path('users/avatar/', views.CurrentUserAvatar.as_view()),
    path('users/<int:id>/avatar', views.UsersAvatars.as_view()),
]
