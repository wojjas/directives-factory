/**
 *
 */

var directiveFactory = angular.module('wjDirectiveFactory', [
	'ui.bootstrap',
	'ngAnimate'
]);

directiveFactory.controller('LoadingTestController',  ['$timeout', function ($timeout) {
	var vm = this;

	vm.isLoading = null;
	vm.loadedData = null;

	vm.startLoading = startLoading;
	vm.activate = activate;

	activate();

	function activate(){
		vm.loadedData = 'Click button above to simulate getting some data';
		vm.isLoading = false;
	}

	function startLoading(){
		vm.loadedData = 'We dont need to empty this';
		vm.isLoading = true;

		$timeout(function () {
			vm.isLoading = false;
			vm.loadedData = 'Hej, hop, now we got: Some Data!';
		}, 2000);
	}
}]);

directiveFactory.controller('DatePickerTestController',  [function () {
	var vm = this;

	vm.selectedDate = null;
	vm.activate = activate;

	activate();

	function activate(){

	}
}]);

