angular.module('exoCinema')
	.factory('serviceAjax',['$http','$q', function ($http, $q) {

		var apikey=""; // votre clé MOVIE DB
		var urlBase = "https://api.themoviedb.org/3";

		var service = {
			getListMovies:getListMovies
		};


		function getListMovies (page,type,query){
			switch(type){
				case 'popular' : 
					url = urlBase+"/movie/popular?api_key="+apikey+"&language=fr-FR&page="+page;
					break;
				default:
					url = urlBase+"/movie/popular?api_key="+apikey+"&language=fr-FR&page="+page;
			}
			return $http(
				{
					method : "GET",
					url : url				
				}
			).then(function(data){return data.data;});

		}

		return service;
	}])

