angular
	.module('exoCinema')
	.filter('genre',['MOVIE_GENRES',function(MOVIE_GENRES){

	return function(id){
		var string = "";
		MOVIE_GENRES.forEach(function(element) {
			if(element.id == id) {
			string = ""+element.name;
			}
		}
	)
			return string;
		}
}])
