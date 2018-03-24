angular.module('exoCinema')
	.controller('ficheCtrl', function ( $scope,$location,DEFAULT_MOVIE_TYPE,MOVIE_TYPES,$routeParams,serviceAjax,store) {
		this.id =$routeParams.idfilm;
		this.details = [];
		this.loading = false;
		this.movieDetails = function() {
			var self = this;
			this.loading = true;
			serviceAjax.getFilmFiche(this.id).then(function(data) {
				console.log(data);
				self.details = data;
				self.loading = false;
			})
		}
		this.back = function() {
			$location.path('/');
		}
		this.movieDetails();
	});
