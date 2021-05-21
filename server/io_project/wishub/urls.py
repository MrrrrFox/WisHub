from django.urls import include, path
from rest_framework import routers
from . import views

# TO DO: Read more about the router
router = routers.DefaultRouter()
router.register(r'posts', views.PostViewSet)
router.register(r'subjects', views.SubjectViewSet)
router.register(r'domains', views.DomainViewSet)

app_name = 'wishub'
urlpatterns = [
    # new views
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls',
                              namespace='rest_framework')),
]
