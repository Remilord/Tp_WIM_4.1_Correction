'use strict';

angular
	.module('exoCinema', [
		'ngRoute','jkAngularRatingStars'
	])
	.config(function ($routeProvider,$locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'defaultCtrl as cinema'
			}).when('/fiche', {
				templateUrl : 'views/fiche.html',
				controller: 'ficheCtrl as fiche'
			})
			.otherwise({
				redirectTo: '/'
			});
		$locationProvider.hashPrefix('');
		/*	  .html5Mode(true);*/
	});
