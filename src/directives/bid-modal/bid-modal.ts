///<reference path="../../_references.d.ts"/>

module NgAuctions.Directives {
    angular.module(moduleName).directive('bidModal', ():ng.IDirective => {
        return {
            restrict: 'E',
            templateUrl: 'src/directives/bid-modal/bid-modal.html',
            scope: {},
            controller: BidModalController,
            controllerAs: 'vm',
            replace: true,
            bindToController: {}
        }
    });

    interface IBidModalViewModel {
        auction:Services.IAuctionData;
        pictures:string[];
        highestBid:number;
        minBidValue:number;
        timeLeft:string;
        bidWasMade:boolean;
        placeBidClick():void;
    }

    class BidModalController implements IBidModalViewModel {
        static $inject:string[] = ['$scope', '$rootScope','$element', '#net', '#time'];
        private vm:IBidModalViewModel;
        public auction:Services.IAuctionData;
        public pictures:string[];
        public highestBid:number;
        public minBidValue:number;
        public timeLeft:string;
        public bidWasMade:boolean;

        constructor($scope:ng.IScope,
                    private $rootScope:ng.IRootScopeService,
                    $element:JQuery,
                    private netService:Services.INetService,
                    private timeService:Services.ITimeService) {
            
            this.vm = this;
            var listeners:Function[] = [];

            listeners.push($rootScope.$on('auctionsLoaded', ()=> {
                if (this.auction) {
                    this.vm.timeLeft = this.timeService.getFormattedCountDown(this.auction.EndTime);
                }
            }));

            listeners.push($rootScope.$on('onAuctionClick', (args:angular.IAngularEvent, productId:string)=> {
                netService.getAuction(productId).then(
                    (response)=> {
                        this.auction = response.data;
                        this.initBidModal()
                    });
            }));

            $scope.$on('$destroy', ()=> listeners.forEach((listener:Function)=> listener()));

            $element.on('hidden.bs.modal', ()=> {
                $scope.$apply(() => this.resetForum());
            });
        }

        private resetForum():void {
            this.vm.pictures = null;
            this.vm.auction = null;
            this.vm.highestBid = null;
            this.bidWasMade = false;
        }

        private initBidModal() {
            this.vm.minBidValue = (this.auction.HighestBid ?
                    this.auction.HighestBid.Bid : this.auction.StartBid) + 0.01;
            this.vm.highestBid = parseFloat((this.minBidValue).toFixed(2));
            this.vm.timeLeft = this.timeService.getFormattedCountDown(this.auction.EndTime);
            this.vm.pictures = [];

            for (var i = 1; i <= 4; i++) {
                var picUrl:string = this.auction['Picture' + i];
                if (picUrl !== "") {
                    this.vm.pictures.push(picUrl);
                }
            }
        }

        public placeBidClick():void {
            var newBid:Services.IBidData = {
                Bid: this.highestBid,
                BidTime: moment().toDate()
            };

            this.netService.addBid(this.auction.Id, newBid).then(
                ()=> {
                    this.$rootScope.$emit('onAuctionsChanged');
                    this.bidWasMade = true;
                },
                ()=> this.vm.highestBid = this.auction.HighestBid.Bid);
        }
    }
}