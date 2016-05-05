///<reference path="../../_references.d.ts"/>
var NgAuctions;
(function (NgAuctions) {
    var Directives;
    (function (Directives) {
        angular.module(NgAuctions.moduleName).directive('category', function () {
            return {
                restrict: 'E',
                templateUrl: 'src/directives/category/category.html',
                scope: {},
                controller: CategoryController,
                controllerAs: 'vm',
                replace: true,
                bindToController: {
                    categoryId: '@',
                    categoryName: '@'
                }
            };
        });
        var CategoryController = (function () {
            function CategoryController($scope, $rootScope, $location) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$location = $location;
                this.vm = this;
                var listener = $rootScope.$on('onCategorySelection', function (id) { return _this.categorySelected = id === _this.categoryId; });
                $scope.$on('$destroy', function () { return listener(); });
                this.initCategory();
            }
            CategoryController.prototype.initCategory = function () {
                this.vm.categoryNameUpperCase = this.categoryName.toUpperCase();
                this.vm.categoryNameLowerCase = this.categoryName.toLowerCase().replace(' ', '-').replace('.', '');
                this.vm.categoryHaveImage = this.categoryId > 0;
                this.vm.categorySelected = false;
            };
            CategoryController.prototype.onCategoryClick = function () {
                this.$location.search({ 'categoryId': this.categoryId !== '0' ? this.categoryId : null });
                this.$rootScope.$emit('onCategorySelection', this.categoryId);
            };
            CategoryController.$inject = ['$scope', '$rootScope', '$location'];
            return CategoryController;
        }());
    })(Directives = NgAuctions.Directives || (NgAuctions.Directives = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=category.js.map