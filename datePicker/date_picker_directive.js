(function () {
	'use strict';

	angular
		.module('wjDirectiveFactory')
		.directive('datePicker', datePickerDirective);

	function datePickerDirective() {
		// Usage:
		// <date-picker context='birth' date="patientCtrl.birthDate"></date-picker>
		var directive = {
			restrict: 'E',
			templateUrl: 'datePicker/datepicker.html',
			controller: 'DatePickerController as DatePickerCtrl',
			scope: {
				context: "@",
				disabled: "@",
				date: "=",
				onlyFuture: "@"
			},
			bindToController: true
		};

		return directive;
	}
})();