///<reference path="../../_references.d.ts"/>
var NgAuctions;
(function (NgAuctions) {
    var Directives;
    (function (Directives) {
        angular.module(NgAuctions.moduleName).directive('auction', function () {
            return {
                restrict: 'E',
                templateUrl: 'src/directives/auction/auction.html',
                scope: {},
                controller: AuctionController,
                controllerAs: 'vm',
                replace: true,
                bindToController: {
                    auction: '='
                }
            };
        });
        var AuctionController = (function () {
            function AuctionController($rootScope, netService, userService, timeService) {
                this.$rootScope = $rootScope;
                this.netService = netService;
                this.userService = userService;
                this.timeService = timeService;
                this.vm = this;
                this.initAuction();
            }
            AuctionController.prototype.initAuction = function () {
                this.vm.highestBid = this.auction.HighestBid ? this.auction.HighestBid.Bid : this.auction.StartBid;
                this.vm.bidCount = this.auction.BidCount > 0 ? (this.auction.BidCount + ' bids') : 'Be the first bidder';
                this.vm.timeLeft = this.timeService.getFormattedCountDown(this.auction.EndTime);
                this.vm.isUserAuction = this.auction.User.Name === this.userService.userName;
                this.vm.category = this.auction.Category.Name.toLowerCase().replace(' ', '-').replace('.', '');
            };
            AuctionController.prototype.openBidModal = function () {
                this.$rootScope.$emit('onAuctionClick', this.auction.Id);
            };
            AuctionController.prototype.deleteAuctionBtn = function () {
                var _this = this;
                this.netService.deleteAuction(this.auction.Id).then(function () { return _this.$rootScope.$emit('onRemoveAuction', _this.auction.Id); });
            };
            AuctionController.$inject = ['$rootScope', '#net', '#user', '#time'];
            return AuctionController;
        }());
    })(Directives = NgAuctions.Directives || (NgAuctions.Directives = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=auction.js.map