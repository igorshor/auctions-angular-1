///<reference path="../../_references.d.ts"/>
var NgAuctions;
(function (NgAuctions) {
    var Directives;
    (function (Directives) {
        angular.module(NgAuctions.moduleName).directive('content', function () {
            return {
                restrict: 'E',
                templateUrl: 'src/directives/content/content.html',
                scope: {},
                controller: ContentWrapperController,
                controllerAs: 'vm',
                replace: false,
                bindToController: {}
            };
        });
        var ContentWrapperController = (function () {
            function ContentWrapperController($scope, $rootScope, categoriesService) {
                var _this = this;
                this.vm = this;
                var listener = $rootScope.$on('onCategorySelection', function (event, id) { return _this.vm.category = categoriesService.categories[id].Name; });
                $scope.$on('$destroy', function () { return listener(); });
            }
            ContentWrapperController.$inject = ['$scope', '$rootScope', '#categories'];
            return ContentWrapperController;
        }());
    })(Directives = NgAuctions.Directives || (NgAuctions.Directives = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=content.js.map