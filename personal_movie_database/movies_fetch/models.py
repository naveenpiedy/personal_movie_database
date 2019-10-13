from django.db import models


class GenreList(models.Model):
    tmdb_id = models.IntegerField()
    genre_string = models.CharField(max_length=256)
