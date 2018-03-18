angular.module('exoCinema')
	.factory('serviceAjax',['$http','$q', function ($http, $q) {

		var apikey="ccb45c824d585e2e549f34d1096877d3"; // votre clé MOVIE DB
		var urlBase = "https://api.themoviedb.org/3";

		var service = {
			getListMovies:getListMovies
		};


		function getListMovies (page,type,query){
					if(query == null) {
					url = urlBase+"/movie/"+type+"?api_key="+apikey+"&language=fr-FR&page="+page;
				}else {
					url = urlBase+"/search/movie?api_key="+apikey+"&query="+query;
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
