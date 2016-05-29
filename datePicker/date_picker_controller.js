(function () {
	'use strict';

	angular
		.module('wjDirectiveFactory')
		.controller('DatePickerController', [DatePicker]);

	function DatePicker() {
		var vm = this;

		vm.minDate = '1850-01-01';
		vm.maxDate = '2050-01-01';
		vm.format = 'yyyy-MM-dd';
		vm.startingDay = 1; 	//Monday
		vm.showWeeks = false; 	//Show week-numbers on what?
		vm.opened = false;

		vm.handleOpen = handleOpen;
		vm.activate = activate;

		activate();

		//////////////////////

		function handleOpen($event) {
			$event.preventDefault();
			$event.stopPropagation();

			vm.opened = true;
		}

		function activate() {
			if (vm.context === "birth" || vm.context === "deceased") {
				vm.maxDate = new Date();
			}

			if (vm.onlyFuture){
				vm.minDate = new Date();
			}
		}
	}
})();