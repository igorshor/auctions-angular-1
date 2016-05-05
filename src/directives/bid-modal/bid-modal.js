///<reference path="../../_references.d.ts"/>
var NgAuctions;
(function (NgAuctions) {
    var Directives;
    (function (Directives) {
        angular.module(NgAuctions.moduleName).directive('bidModal', function () {
            return {
                restrict: 'E',
                templateUrl: 'src/directives/bid-modal/bid-modal.html',
                scope: {},
                controller: BidModalController,
                controllerAs: 'vm',
                replace: true,
                bindToController: {}
            };
        });
        var BidModalController = (function () {
            function BidModalController($scope, $rootScope, $element, netService, timeService) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.netService = netService;
                this.timeService = timeService;
                this.vm = this;
                var listeners = [];
                listeners.push($rootScope.$on('auctionsLoaded', function () {
                    if (_this.auction) {
                        _this.vm.timeLeft = _this.timeService.getFormattedCountDown(_this.auction.EndTime);
                    }
                }));
                listeners.push($rootScope.$on('onAuctionClick', function (args, productId) {
                    netService.getAuction(productId).then(function (response) {
                        _this.auction = response.data;
                        _this.initBidModal();
                    });
                }));
                $scope.$on('$destroy', function () { return listeners.forEach(function (listener) { return listener(); }); });
                $element.on('hidden.bs.modal', function () {
                    $scope.$apply(function () { return _this.resetForum(); });
                });
            }
            BidModalController.prototype.resetForum = function () {
                this.vm.pictures = null;
                this.vm.auction = null;
                this.vm.highestBid = null;
                this.bidWasMade = false;
            };
            BidModalController.prototype.initBidModal = function () {
                this.vm.minBidValue = (this.auction.HighestBid ?
                    this.auction.HighestBid.Bid : this.auction.StartBid) + 0.01;
                this.vm.highestBid = parseFloat((this.minBidValue).toFixed(2));
                this.vm.timeLeft = this.timeService.getFormattedCountDown(this.auction.EndTime);
                this.vm.pictures = [];
                for (var i = 1; i <= 4; i++) {
                    var picUrl = this.auction['Picture' + i];
                    if (picUrl !== "") {
                        this.vm.pictures.push(picUrl);
                    }
                }
            };
            BidModalController.prototype.placeBidClick = function () {
                var _this = this;
                var newBid = {
                    Bid: this.highestBid,
                    BidTime: moment().toDate()
                };
                this.netService.addBid(this.auction.Id, newBid).then(function () {
                    _this.$rootScope.$emit('onAuctionsChanged');
                    _this.bidWasMade = true;
                }, function () { return _this.vm.highestBid = _this.auction.HighestBid.Bid; });
            };
            BidModalController.$inject = ['$scope', '$rootScope', '$element', '#net', '#time'];
            return BidModalController;
        }());
    })(Directives = NgAuctions.Directives || (NgAuctions.Directives = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=bid-modal.js.map