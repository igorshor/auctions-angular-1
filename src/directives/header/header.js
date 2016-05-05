///<reference path="../../_references.d.ts"/>
var NgAuctions;
(function (NgAuctions) {
    var Directives;
    (function (Directives) {
        angular.module(NgAuctions.moduleName).directive('header', function () {
            return {
                restrict: 'E',
                templateUrl: 'src/directives/header/header.html',
                scope: {},
                controller: HeaderController,
                controllerAs: 'vm',
                replace: false,
                bindToController: {}
            };
        });
        var HeaderController = (function () {
            function HeaderController($rootScope, userService) {
                this.$rootScope = $rootScope;
                this.vm = this;
                this.vm.user = userService.userName;
            }
            HeaderController.$inject = ['$rootScope', '#user'];
            return HeaderController;
        }());
    })(Directives = NgAuctions.Directives || (NgAuctions.Directives = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=header.js.map