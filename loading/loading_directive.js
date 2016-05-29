(function () {
	'use strict';

	angular
		.module('wjDirectiveFactory')
		.directive('loadingMessage', ['$window', loading]);

	function loading($window) {
		// Usage:
		// <loading-message delay="500" message="Loading..." is-loading="SomeCtrl.isLoading"> </loading-message>
		// Creates:
		// 
		var directive = {
			restrict: 'E',
			templateUrl: 'loading/loading.html',
			controller: 'LoadingController',
			controllerAs: 'LoadingCtrl',
			scope: {
				delay: '@',
				message: '@',
				isLoading: '='
			},
			bindToController: true
		};

		return directive;
	}
})();
