///<reference path="../../_references.d.ts"/>
var NgAuctions;
(function (NgAuctions) {
    var Directives;
    (function (Directives) {
        angular.module(NgAuctions.moduleName).directive('smartEllipsis', function () {
            return {
                restrict: 'A',
                scope: true,
                controller: SmartEllipsisController
            };
        });
        var SmartEllipsisController = (function () {
            function SmartEllipsisController($element, $scope) {
                $scope.$watch(function () { return $element.dotdotdot({ watch: true }); });
            }
            SmartEllipsisController.$inject = ['$element', '$scope'];
            return SmartEllipsisController;
        })();
    })(Directives = NgAuctions.Directives || (NgAuctions.Directives = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=smart-ellipsis.js.map