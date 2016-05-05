///<reference path="../../_references.d.ts"/>
var NgAuctions;
(function (NgAuctions) {
    var Directives;
    (function (Directives) {
        angular.module(NgAuctions.moduleName).directive('auctions', function () {
            return {
                restrict: 'E',
                templateUrl: 'src/directives/auctions/auctions.html',
                scope: {},
                controller: AuctionsViewController,
                controllerAs: 'vm',
                replace: true,
                bindToController: {}
            };
        });
        var AuctionsViewController = (function () {
            function AuctionsViewController($scope, $location, $rootScope, $filter, $interval, netService, categoriesService) {
                var _this = this;
                this.$location = $location;
                this.$rootScope = $rootScope;
                this.netService = netService;
                this.categoriesService = categoriesService;
                this.vm = this;
                this.filter = $filter("filter");
                this.loadAuctions();
                var updateInterval = $interval(function () { return _this.loadAuctions(); }, 1000 * 60);
                var listeners = [];
                listeners.push($rootScope.$on('onCategorySelection', function (event, id) { return _this.auctionsFilterByCategory(id); }));
                listeners.push($rootScope.$on('onAuctionsChanged', function (event) { return _this.loadAuctions(); }));
                listeners.push($rootScope.$on('onRemoveAuction', function (event, auctionId) { return _this.removeAuction(auctionId); }));
                $scope.$on('$destroy', function () { return listeners.forEach(function (listener) { return listener(); }); });
            }
            AuctionsViewController.prototype.loadAuctions = function () {
                var _this = this;
                this.netService.getAuctions().then(function (response) {
                    _this.auctions = response.data;
                    _this.setSelectedCategory();
                    _this.$rootScope.$emit('auctionsLoaded');
                });
            };
            AuctionsViewController.prototype.auctionsFilterByCategory = function (categoryId) {
                var id = parseInt(categoryId);
                if (id === 0 || !this.categoriesService.categories[categoryId] || !this.auctions) {
                    this.vm.auctionsToShow = this.auctions;
                    return;
                }
                this.vm.auctionsToShow = this.filter(this.auctions, { Category: { Id: categoryId } });
            };
            AuctionsViewController.prototype.removeAuction = function (auctionId) {
                var auction = $.grep(this.auctionsToShow, function (auction) { return auction.Id === auctionId; });
                if (auction.length === 1) {
                    this.removeElementFromArray(this.auctions, auction[0]);
                    this.removeElementFromArray(this.auctionsToShow, auction[0]);
                }
            };
            AuctionsViewController.prototype.removeElementFromArray = function (array, element) {
                var index = array.indexOf(element);
                if (index > -1) {
                    array.splice(index, 1);
                }
            };
            AuctionsViewController.prototype.setSelectedCategory = function () {
                var queryVariables = this.$location.search();
                this.selectedCategory = (queryVariables["categoryId"] ? parseInt(queryVariables["categoryId"]) : 0);
                var selectedCategoryId = this.selectedCategory.toString();
                this.$rootScope.$emit('onCategorySelection', selectedCategoryId);
            };
            AuctionsViewController.$inject = ['$scope', '$location', '$rootScope', '$filter', '$interval', '#net', '#categories'];
            return AuctionsViewController;
        }());
    })(Directives = NgAuctions.Directives || (NgAuctions.Directives = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=auctions.js.map