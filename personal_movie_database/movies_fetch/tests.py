from django.test import TestCase
from .views import TMDBInterface, IMDBInterface


class TMDBInterfaceTest(TestCase):
    def setUp(self) -> None:
        self.test_obj = TMDBInterface()
        self.imdb_test = IMDBInterface()

    def test_search_movies(self):
        result_1 = self.test_obj.search_movie(query="Thor", page=1, year=2017)
        self.assertEquals(1, result_1["page"])

    def test_search_tv(self):
        result_1 = self.test_obj.search_tv(query="Firely")
        self.assertEquals(1, result_1["page"])

    def test_search_people(self):
        result_1 = self.test_obj.search_people(query="Emma Watson")
        self.assertEquals(1, result_1["page"])

    def test_search_multi(self):
        result_1 = self.test_obj.search_multi(query="Tom Hanks")
        self.assertEquals(1, result_1["page"])

    def test_search_company(self):
        result_1 = self.test_obj.search_company(query="Disney")
        self.assertEquals(1, result_1["page"])

    def test_search_collection(self):
        result_1 = self.test_obj.search_collection(query="Tarantino")
        self.assertEquals(1, result_1["page"])

    def test_search_keyword(self):
        result_1 = self.test_obj.search_keyword(query="Comedy")
        self.assertEquals(1, result_1["page"])

    def test_imdb_search(self):
        result_1 = self.imdb_test.search_movie(query="Avengers")
        self.assertEquals('True', result_1["Response"])

    def test_imdb_id(self):
        result_1 = self.imdb_test.get_movie_id(query="tt0848228")
        self.assertEquals('True', result_1["Response"])
