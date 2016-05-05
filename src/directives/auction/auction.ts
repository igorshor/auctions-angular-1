///<reference path="../../_references.d.ts"/>

module NgAuctions.Directives {
    import IPromise = angular.IPromise;
    angular.module(moduleName).directive('auction', ():ng.IDirective => {
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
        }
    });

    interface IAuctionViewModel {
        auction:Services.IAuctionData;
        highestBid:number;
        bidCount:string;
        timeLeft:string;
        isUserAuction:boolean;
        category:string;
        openBidModal():void;
        deleteAuctionBtn():void;
    }

    class AuctionController implements IAuctionViewModel {
        static $inject:string[] = ['$rootScope', '#net', '#user', '#time'];
        private vm:IAuctionViewModel;
        public auction:Services.IAuctionData;
        public highestBid:number;
        public bidCount:string;
        public timeLeft:string;
        public isUserAuction:boolean;
        public category:string;

        constructor(private $rootScope:ng.IRootScopeService,
                    private netService:Services.INetService,
                    private userService:Services.IUserService,
                    private timeService:Services.ITimeService) {
            this.vm = this;
            this.initAuction();
        }

        private initAuction() {
            this.vm.highestBid = this.auction.HighestBid ? this.auction.HighestBid.Bid : this.auction.StartBid;
            this.vm.bidCount = this.auction.BidCount > 0 ? (this.auction.BidCount + ' bids') : 'Be the first bidder';
            this.vm.timeLeft = this.timeService.getFormattedCountDown(this.auction.EndTime);
            this.vm.isUserAuction = this.auction.User.Name === this.userService.userName;
            this.vm.category = this.auction.Category.Name.toLowerCase().replace(' ', '-').replace('.', '');
        }

        public openBidModal():void {
            this.$rootScope.$emit('onAuctionClick', this.auction.Id);
        }

        public deleteAuctionBtn():void {
            this.netService.deleteAuction(this.auction.Id).then(()=> this.$rootScope.$emit('onRemoveAuction', this.auction.Id));
        }
    }
}