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
			})
			.otherwise({
				redirectTo: '/'
			});
		$locationProvider.hashPrefix('');
		/*	  .html5Mode(true);*/
	});

