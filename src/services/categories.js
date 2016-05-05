///<reference path="../_references.d.ts"/>
var NgAuctions;
(function (NgAuctions) {
    var Services;
    (function (Services) {
        var CategoriesService = (function () {
            function CategoriesService() {
                this.categoriesNames = ['Electronics', 'Fashion', 'Home', 'Books', 'Children', 'Misc.'];
                this.defaultCategory = 'All Auctions';
                this.categories = [
                    { Id: 0, Name: this.defaultCategory },
                    { Id: 1, Name: this.categoriesNames[0] },
                    { Id: 2, Name: this.categoriesNames[1] },
                    { Id: 3, Name: this.categoriesNames[2] },
                    { Id: 4, Name: this.categoriesNames[3] },
                    { Id: 5, Name: this.categoriesNames[4] },
                    { Id: 6, Name: this.categoriesNames[5] }];
            }
            CategoriesService.prototype.getCategoryId = function (name) {
                return this.categoriesNames.indexOf(name) + 1;
            };
            CategoriesService.prototype.getCategoryName = function (id) {
                return this.categoriesNames[id - 1];
            };
            return CategoriesService;
        }());
        angular.module(NgAuctions.moduleName).service('#categories', CategoriesService);
    })(Services = NgAuctions.Services || (NgAuctions.Services = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=categories.js.map