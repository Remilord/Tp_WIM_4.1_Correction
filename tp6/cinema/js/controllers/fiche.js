angular.module('exoCinema')
	.controller('ficheCtrl', function ( $scope,DEFAULT_MOVIE_TYPE,MOVIE_TYPES,$routeParams,serviceAjax,store) {
		this.id = store.get("theid");
	});