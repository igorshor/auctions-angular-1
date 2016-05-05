///<reference path="../../_references.d.ts"/>
var NgAuctions;
(function (NgAuctions) {
    var Directives;
    (function (Directives) {
        angular.module(NgAuctions.moduleName).directive('nav', function () {
            return {
                restrict: 'E',
                templateUrl: 'src/directives/nav/nav.html',
                scope: {},
                controller: NavigationController,
                controllerAs: 'vm',
                replace: false,
                bindToController: {}
            };
        });
        var NavigationController = (function () {
            function NavigationController(categoriesService) {
                this.vm = this;
                this.vm.categories = categoriesService.categories;
            }
            NavigationController.$inject = ['#categories'];
            return NavigationController;
        })();
    })(Directives = NgAuctions.Directives || (NgAuctions.Directives = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=nav.js.map