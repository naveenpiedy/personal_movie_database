import json

import requests
from decouple import config
from rest_framework import views, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from . import serializers


class TMDBInterface:

    def __init__(self):

        """
        url_v4 : Url that uses API V4
        url_v3 : Url that uses API V3
        bearer_key : Bearer authorization for payload
        image_url : Url needed to retrieve images

        """
        self.url_v4 = "https://api.themoviedb.org/4"
        self.url_v3 = "https://api.themoviedb.org/3"
        self.bearer_key = "Bearer {}".format(config('tmdb_apiv4_key'))
        self.content_type = "application/json;charset=utf-8"
        self.header_payload = {"Authorization": self.bearer_key, "content-type": self.content_type}
        response = requests.get(self.url_v3+"/configuration", headers=self.header_payload)
        response_json = json.loads(response.text)
        self.image_url = response_json["images"]["base_url"]

    def _search(self, search_url: str = None, query: str = None, **kwargs) -> json:

        """
        Returns search results for the given search url
        Note: Not meant to be used outside the class
        """

        payload = {"query": query}
        for key, value in kwargs.items():
            payload[str(key)] = value
        response = requests.get(search_url, params=payload, headers=self.header_payload)
        response_json = json.loads(response.text)
        return response_json

    def search_movie(self, query: str = None, **kwargs) -> json:
        """
        Search movies
        :param query: Search query for movie
        :param kwargs:{
                language: str,
                page: int,
                include_adult: bool,
                region: str,
                year: int,
                primary_release_year: int
        :return: json from _search
        """
        search_url = "{}/search/movie".format(self.url_v4)
        return self._search(search_url, query, **kwargs)

    def search_tv(self, query: str = None, **kwargs) -> json:
        """
        Search tv
        :param query: Search query for tv shows
        :param kwargs:{
                language: str,
                page: int,
                first_air_date_year: int,}
        :return: json from _search
        """
        search_url = "{}/search/tv".format(self.url_v4)
        return self._search(search_url, query, **kwargs)

    def search_people(self, query: str = None, **kwargs) -> json:
        """
        Search people
        :param query: Search query for people
        :param kwargs:{
                language: str,
                page: int,
                include_adult: bool,
                region: str,}
        :return: json from _search
        """
        search_url = "{}/search/person".format(self.url_v4)
        return self._search(search_url, query, **kwargs)

    def search_multi(self, query: str = None, **kwargs) -> json:
        """
        Search everything
        :param query: Keyword search
        :param kwargs:{
                language: str,
                page: int,
                include_adult: bool,
                region: str,}
        :return: json from _search
        """
        search_url = "{}/search/multi".format(self.url_v4)
        return self._search(search_url, query, **kwargs)

    def search_company(self, query: str = None, **kwargs) -> json:
        """
        Search Company
        :param query: Search query for people
        :param kwargs:{
                page: int,}
        :return: json from _search
        """
        search_url = "{}/search/company".format(self.url_v3)
        return self._search(search_url, query, **kwargs)

    def search_collection(self, query: str = None, **kwargs) -> json:
        """
        Search Collection
        :param query: Collection search
        :param kwargs:{
                page: int,}
        :return: json from _search
        """
        search_url = "{}/search/collection".format(self.url_v3)
        return self._search(search_url, query, **kwargs)

    def search_keyword(self, query: str = None, **kwargs) -> json:
        """
        Keyword search
        :param query: Keyword to be searched
        :param kwargs:{
                page: int,}
        :return: json from _search
        """
        search_url = "{}/search/keyword".format(self.url_v3)
        return self._search(search_url, query, **kwargs)

    def get_movie(self, tmdb_id: int) -> json:

        # To get a specific movie by id

        get_url = f"{self.url_v3}/movie/{tmdb_id}?&language=en-US"
        response = requests.get(get_url, headers=self.header_payload)
        response_json = json.loads(response.text)
        return response_json


class IMDBInterface:

    def __init__(self):
        self.url = "https://movie-database-imdb-alternative.p.rapidapi.com/"
        self.headers = {
            'x-rapidapi-host': "movie-database-imdb-alternative.p.rapidapi.com",
            'x-rapidapi-key': config("x_rapidapi_key")
        }

    def search_movie(self, query: str, **kwargs) -> json:
        """
        Search IMDB for movies by title
        :param query: Movie title
        :param kwargs: {
                page:int,
                type: str ['movie', 'series', 'episode'],
                y: int (year)}
        :return: json
        """
        payload = {"s": query, "r": "json"}
        for key, value in kwargs.items():
            payload[str(key)] = value
        response = requests.get(self.url, params=payload, headers=self.headers)
        response_json = json.loads(response.text)
        return response_json

    def get_movie_id(self, query: str, **kwargs) -> json:
        """
        Get from IMDB by ID
        :param query: ID
        :param kwargs: {
                page:int,
                type: str ['movie', 'series', 'episode'],
                plot: str ['short', 'full']
                y: int (year)}
        :return: json
        """
        payload = {"i": query, "r": "json"}
        for key, value in kwargs.items():
            payload[str(key)] = value
        response = requests.get(self.url, params=payload, headers=self.headers)
        response_json = json.loads(response.text)
        return response_json


class SearchMoviesView(viewsets.ViewSet):

    def list(self, request):
        query_params = request.query_params
        tmdb_obj = TMDBInterface()
        results = tmdb_obj.search_movie(query_params['movie_name'])
        return Response(data=results)


class GetMoviesView(viewsets.ViewSet):

    def list(self, request):
        query_params = request.query_params
        tmdb_obj = TMDBInterface()
        imdb_obj = IMDBInterface()
        tmdb_result = tmdb_obj.get_movie(query_params['tmdb_id'])
        outgoing_json = None
        if tmdb_result:
            outgoing_json = {"tmdb_result": tmdb_result}
            if tmdb_result.get("imdb_id"):
                imdb_id = tmdb_result.get("imdb_id")
                imdb_results = imdb_obj.get_movie_id(imdb_id)
                outgoing_json["imdb_results"] = imdb_results
        return Response(data=outgoing_json)
