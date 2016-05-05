///<reference path="../../_references.d.ts"/>
var NgAuctions;
(function (NgAuctions) {
    var Directives;
    (function (Directives) {
        angular.module(NgAuctions.moduleName).directive("minValue", [function () {
                return {
                    require: 'ngModel',
                    link: function (scope, elem, attrs, ctrl) {
                        ctrl.$parsers.unshift(function (viewValue) {
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
    })(Directives = NgAuctions.Directives || (NgAuctions.Directives = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=min-value.js.map