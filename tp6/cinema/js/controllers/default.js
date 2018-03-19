angular.module('exoCinema')
	.controller('defaultCtrl', function ( $scope,$location,DEFAULT_MOVIE_TYPE,MOVIE_TYPES,$routeParams,serviceAjax,store) {

		this.films = [];
		this.currentPage=1;
		this.totalPages=null;
		this.loading=false;
		this.tri = 'title';
		this.order = true;
		this.querySearch=null;
		this.type = DEFAULT_MOVIE_TYPE.name;
		this.types = MOVIE_TYPES;
		this.size = "w342";
		this.columnsize = 3;
		
		 var self = this;
		this.getMovies = function(){
			this.loading=true;
			var self = this;
			serviceAjax
				.getListMovies(this.currentPage,this.type,this.querySearch)
				.then(function(data){
					console.log(data);
					self.currentPage=data.page;
					self.films=data.results;
					self.totalPages=data.total_pages;
					self.loading=false;
				})
		}

		/* fonctions à copmléter à utiliser
		* dans la vue */
		this.search=function(){
			self.querySearch = $scope.query.replace(/ /g,"+");
		}

		this.sortRate=function(order){
				self.tri = "vote_average";
				if(order == 0) {
					self.order = true;
				}else {
					self.order = false;
				}
		}

		this.sortTitle=function(order){
			self.tri = "title";
			if(order == 0) {
				self.order = true;
			}else {
				self.order = false;
			}
		}

		this.decPage=function(){
			if(this.currentPage > 1) {
				this.currentPage--;
			}
		}

		this.incPage=function(){
			if(this.currentPage < this.totalPages) {
				this.currentPage++;
			}
		}
		$scope.$watch("cinema.querySearch",function() {
			self.getMovies();
		});
		$scope.$watch("cinema.currentPage",function(){
		self.getMovies();
		})
		$scope.$watch("cinema.size",function() {
			if(self.size ==6) {
				self.size = "w500";
			self.columnsize = 6;
			}else if (self.size == 4) {
					self.size = "w342";
				self.columnsize = 3;
			}else if(self.size==3) {
					self.size = "w185";
			self.columnsize = 2;
			}
		})
		$scope.$watch("cinema.type",function() {
			self.getMovies();
		})
		this.changeType = function(type){
		self.type= type;
		self.querySearch = null;
		}
		this.goToFiche = function(id) {
			store.store("theid",id.split(':')[1]);
			$location.path('/fiche');
		}
		this.getMovies();
	})
