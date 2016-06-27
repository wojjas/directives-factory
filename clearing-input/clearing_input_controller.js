(function () {
    'use strict';

    var controllerId = 'ClearingInputController';

    angular.module('wjDirectiveFactory')
        .controller(controllerId, ['$scope', ClearingInput]);

    function ClearingInput($scope) {
        var vm = this;
        var originalValue = null;

        vm.value = null;                //value bound to the view, externalValue is the one bound to the model using this directive, via this directive's attribute (bound scope)

        vm.onChange = onChange;
        vm.onFocus = onFocus;
        vm.onLeave = onLeave;
        vm.activate = activate;

        activate();

        function activate() {
            vm.value = vm.externalValue;
        }

        function onChange() {
            vm.externalValue = vm.value;
        }

        function onFocus() {
            originalValue = vm.value;
            vm.value = '';
        }

        function onLeave() {
            if (!vm.value) {
                vm.value = originalValue;
            } else {
                vm.externalValue = vm.value;
            }
        }

        $scope.$watch(function () {
            return vm.externalValue;
        },function(value){
            vm.value = value;
        });
    }
})();