(function () {
    'use strict';

    angular.module('wjDirectiveFactory')
        .directive('clearingInput', [clearingInputDirective]);

    function clearingInputDirective() {
        // Usage:
        //  <clearing-input value="ClearingInputTestCtrl.someValue"></clearing-input>
        //
        var directive = {
            restrict: 'E',
            templateUrl: 'clearing-input/clearing_input.html',
            controller: 'ClearingInputController as ClearingInputCtrl',
            scope: {
                externalValue: "="
            },
            bindToController: true
        };
        return directive;
    }
})();