angular
	.module('exoCinema')
	.directive('loading', function () {
		return {
			template: '<div><div ng-show="loading" class="spinner"></div><div ng-transclude ng-hide="loading"></div></div>',
			restrict: 'A',
			transclude: true,
			replace: true,
			scope:{
				loading: "=loading"
			},
			compile: function compile(element, attrs, transclude){
			}
		};
	});
