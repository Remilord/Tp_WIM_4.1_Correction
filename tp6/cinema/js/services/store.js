angular.module('exoCinema')
	.factory('store',function ($rootScope) {
		var mem = {};
		return {
			store: function(key,value) {
				mem[key] = value;
			},
			get: function(key) {
				return mem[key];
			}
		};
	});