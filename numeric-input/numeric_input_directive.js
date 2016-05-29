(function () {
	'use strict';

	angular.module('wjDirectiveFactory')
		.directive('numericInput', ['$locale', '$window', numericInputDirective]);

	function numericInputDirective($locale, $window) {
		// Usage:
		//<input type="text" ng-model="SomeCtrl.price" numeric-input max-value="99" old-value="{{MyCtrl.price}}">
		var thousandSeparator = null;
		var decimalSymbol = null;

		var directive = {
			link: link,
			restrict: 'A',
			require: 'ngModel',
			scope: {
				allowZero: '@',		//Allows 0 in the fileld. Give it the string 'true' or just don't set it to disallow.
				maxValue: '@',
				oldValue: '@',
				allowDecimals: '@'
			}
		};

		return directive;

		///////////////////////////////////////////////////////

		function link(scope, element, attrs, ngModel) {
			ngModel.$viewChangeListeners.push(function () {
				var allowZero = attrs.allowZero && attrs.allowZero.toLowerCase() === 'true' ? true : false;
				var maxValue = attrs.maxValue && parseInt(attrs.maxValue);
				var inputVal = element.val();
				var oldVal = attrs.oldValue || maxValue;
				var allowDecimals = attrs.allowDecimals === 'true';

				setSeparators();

				//Clear left side zeros
				while (inputVal.charAt(0) == '0' && !allowZero) {
					inputVal = inputVal.substr(1);
				}

				//Don't exceed maxValue
				if (inputVal && maxValue) {
					var tmp = inputVal.replace(decimalSymbol, '.');
					tmp = parseInt(tmp.replace(thousandSeparator, ''));

					if (tmp > maxValue) {
						//TODO: Show/flash info about max-value.
						//console.log('Max exceeded ', oldVal);
						ngModel.$setViewValue(oldVal);
						ngModel.$render();

						return;
					}
				}

				//Handle comma-sign
				if (allowDecimals) {
					if (decimalSymbol === ',') {
						inputVal = inputVal.replace(/[^\d,\'.']/g, '');
						inputVal = inputVal.replace(/['.']/g, '');			//Don't use . as thousandSeparator in countries using , as decimal-symbol.
					} else {
						inputVal = inputVal.replace(/[^\d.\',']/g, '');
					}
				} else {
					inputVal = inputVal.replace(decimalSymbol, '');
					inputVal = inputVal.replace(thousandSeparator, '');
				}

				var indexOfDecimalSymbol = inputVal.indexOf(decimalSymbol);
				if (indexOfDecimalSymbol >= 0) {
					inputVal = inputVal.slice(0, indexOfDecimalSymbol + 3);
				}

				var decimalSplit = inputVal.split(decimalSymbol);
				var intPart = decimalSplit[0];
				var decPart = decimalSplit[1];

				intPart = intPart.replace(/[^\d]/g, '');


				//NB: Placing a separator into the someNumber like this converts it from an someNumber into a string.
				if (intPart.length > 3) {
					var intDiv = Math.floor(intPart.length / 3);
					while (intDiv > 0) {
						var lastThousandSeparator = intPart.indexOf(thousandSeparator);
						if (lastThousandSeparator < 0) {
							lastThousandSeparator = intPart.length;
						}

						if (lastThousandSeparator - 3 > 0) {
							intPart = intPart.slice(0, lastThousandSeparator - 3) + thousandSeparator + intPart.slice(lastThousandSeparator - 3);
						}
						intDiv--;
					}
				}

				if (decPart === undefined) {
					decPart = "";
				}
				else {
					decPart = decimalSymbol + decPart;
				}

				var res = intPart + decPart;
				//res = res !== "" ? parseInt(res) || oldVal : "";

				ngModel.$setViewValue(res);
				ngModel.$render();
			});
		}

		//We are only interested in thousand and decimal separators, these depend on browser's language
		function setSeparators(){
			thousandSeparator = ' ';
			decimalSymbol = ',';		//Good for Spain, Finland, Germany, Sweden

			var lang = $window.navigator.language || $window.navigator.userLanguage;

			lang = lang.toLowerCase();

			if (lang === 'en' || lang === 'en-us' || lang === 'en-au' || lang ==='en-gb') {
				thousandSeparator = ' ';		//Yeah, I know, the English use , but I like space better...
				decimalSymbol = '.';
			}
		}
	}
})();