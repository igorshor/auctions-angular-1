///<reference path="../../_references.d.ts"/>

module NgAuctions.Directives {
    interface IMinLengthAttributes extends ng.IAttributes {
        minValue: string;
    }

    angular.module(moduleName).directive("minValue",
        [() => {
            return {
                require: 'ngModel',
                link: (scope:ng.IScope, elem:JQuery, attrs:IMinLengthAttributes, ctrl:ng.INgModelController) => {
                    ctrl.$parsers.unshift((viewValue) => {
                        if (parseFloat(viewValue) <= parseFloat(attrs.minValue)) {
                            ctrl.$setValidity('minValue', false);
                            return viewValue;
                        }
                        else {
                            ctrl.$setValidity('minValue', true);
                            return viewValue;
                        }
                    });
                }
            };
        }]);

}