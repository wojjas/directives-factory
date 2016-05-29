(function () {
	'use strict';

	var controllerId = 'LoadingController';

	angular.module('wjDirectiveFactory')
		.controller(controllerId, ['$timeout', Loading]);

	function Loading($timeout) {
		var vm = this;

		vm.isDelayPassed = false;
		vm.delay = null;
		vm.message = null;

		vm.show = show;
		vm.activate = activate;

		activate();

		function activate() {
			var delay = vm.delay || 500;
			vm.message = vm.message || 'Loading...';

			$timeout(function () {
				vm.isDelayPassed = true;
			}, delay);
		}

		function show(){
			return vm.isDelayPassed && vm.isLoading;
		}
	}
})();