angular.module('exoCinema')
	.controller('defaultCtrl', function ( DEFAULT_MOVIE_TYPE,MOVIE_TYPES,$routeParams,serviceAjax) {

		this.films = [];
		this.currentPage=1;
		this.totalPages=null;
		this.loading=false;
		this.tri = 'title';
		this.order = true;
		this.querySearch=null;
		this.type = DEFAULT_MOVIE_TYPE.name; 
		this.types = MOVIE_TYPES; 

				this.getMovies = function(){
			this.loading=true;
					var self = this;
			serviceAjax
				.getListMovies(this.currentPage,this.type,this.querySearch)
				.then(function(data){
					console.log(data);
					self.currentPage=data.data.page;
					self.films=data.data.results;
					self.totalPages=data.data.total_pages;
					self.loading=false;
				})
		}
	
		/* fonctions à copmléter à utiliser
		* dans la vue */

		this.search=function(){
		}

		this.sortRate=function(order){
		}

		this.sortTitle=function(order){
		}

		this.decPage=function(){
		}

		this.incPage=function(){
		}

		/*		this.$watch("page",function(){
		this
			.getMovies(this.page,this.type);
		})*/
		this.changeType = function(type){
		}

		this
			.getMovies();
	})
