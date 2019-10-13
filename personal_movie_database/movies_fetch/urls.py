from django.urls import path, include

from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'search_internet', views.SearchMoviesView, base_name="movie_name")
router.register(r'get_by_id', views.GetMoviesView, base_name="get_by_id")

urlpatterns = [
    path('', include(router.urls)),
]
