///<reference path="../../_references.d.ts"/>
var NgAuctions;
(function (NgAuctions) {
    var Directives;
    (function (Directives) {
        angular.module(NgAuctions.moduleName).directive('sellModal', function () {
            return {
                restrict: 'E',
                templateUrl: 'src/directives/sell-modal/sell-modal.html',
                scope: {},
                controller: SellModalController,
                controllerAs: 'vm',
                replace: true,
                bindToController: {}
            };
        });
        var SellModalController = (function () {
            function SellModalController($scope, $rootScope, $element, netService, categoriesService) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.netService = netService;
                this.categoriesService = categoriesService;
                this.vm = this;
                this.initData();
                $scope.$watch(function () { return _this.selectedCategory; }, function (newVal) {
                    if (newVal) {
                        _this.product.CategoryId = newVal.Id;
                    }
                });
                $scope.$watch(function () { return _this.selectedFutureDate; }, function (newVal) {
                    if (newVal) {
                        _this.product.EndTime = newVal.futureDate;
                    }
                });
                $element.on('show.bs.modal', function () {
                    $scope.$apply(function () {
                        _this.resetForm();
                        $scope.sellForm.$setPristine();
                    });
                });
            }
            SellModalController.prototype.initData = function () {
                this.vm.categories = this.categoriesService.categories;
                this.vm.futureDates = [
                    { futureDateString: '1 Day', futureDate: moment().add(1, 'days').toDate() },
                    { futureDateString: '2 Days', futureDate: moment().add(2, 'days').toDate() },
                    { futureDateString: '3 Days', futureDate: moment().add(3, 'days').toDate() },
                    { futureDateString: '4 Days', futureDate: moment().add(4, 'days').toDate() },
                    { futureDateString: '5 Days', futureDate: moment().add(5, 'days').toDate() },
                    { futureDateString: '6 Days', futureDate: moment().add(5, 'days').toDate() },
                    { futureDateString: '1 Week', futureDate: moment().add(1, 'weeks').toDate() },
                    { futureDateString: '2 Weeks', futureDate: moment().add(2, 'weeks').toDate() },
                    { futureDateString: '3 Weeks', futureDate: moment().add(3, 'weeks').toDate() },
                    { futureDateString: '1 Month', futureDate: moment().add(1, 'months').toDate() },
                    { futureDateString: '2 Months', futureDate: moment().add(2, 'months').toDate() },
                    { futureDateString: '3 Months', futureDate: moment().add(3, 'months').toDate() },
                    { futureDateString: '4 Months', futureDate: moment().add(4, 'months').toDate() }];
            };
            SellModalController.prototype.resetForm = function () {
                var date = moment().toDate();
                var futureDate = this.selectedFutureDate ? this.selectedFutureDate.futureDate : date;
                this.product = {
                    Title: '',
                    Description: '',
                    StartTime: date,
                    EndTime: futureDate,
                    StartBid: 0.01,
                    Picture1: '',
                    Picture2: '',
                    Picture3: '',
                    Picture4: '',
                    IsItemConditionNew: '1',
                    CategoryId: 1
                };
                this.selectedCategory = this.categories[1];
                this.selectedFutureDate = this.futureDates[6];
            };
            SellModalController.prototype.addAndSaveBtn = function () {
                var _this = this;
                this.netService.createAuction(this.product).then(function () {
                    _this.$rootScope.$emit('onAuctionsChanged');
                });
            };
            SellModalController.$inject = ['$scope', '$rootScope', '$element', '#net', '#categories'];
            return SellModalController;
        }());
    })(Directives = NgAuctions.Directives || (NgAuctions.Directives = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=sell-modal.js.map