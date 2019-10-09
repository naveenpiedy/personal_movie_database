from django.urls import path, include

from .views import GetMoviesView
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'', views.GetMoviesView, base_name="movie_name")

urlpatterns = [
    path('', include(router.urls)),
]
