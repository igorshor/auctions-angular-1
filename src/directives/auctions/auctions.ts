///<reference path="../../_references.d.ts"/>

module NgAuctions.Directives {
    angular.module(moduleName).directive('auctions', ():ng.IDirective => {
        return {
            restrict: 'E',
            templateUrl: 'src/directives/auctions/auctions.html',
            scope: {},
            controller: AuctionsViewController,
            controllerAs: 'vm',
            replace: true,
            bindToController: {}
        }
    });

    interface IAuctionsViewViewModel {
        auctions:Services.IAuctionData[];
        auctionsToShow:Services.IAuctionData[];
        selectedCategory:number;
    }

    class AuctionsViewController implements IAuctionsViewViewModel {
        static $inject:string[] = ['$scope', '$location', '$rootScope', '$filter', '$interval', '#net', '#categories'];
        private vm:IAuctionsViewViewModel;
        public auctions:Services.IAuctionData[];
        public auctionsToShow:Services.IAuctionData[];
        public selectedCategory:number;
        private filter:angular.IFilterFilter;

        constructor($scope:ng.IScope,
                    private $location:ng.ILocationService,
                    private $rootScope:ng.IRootScopeService,
                    $filter:ng.IFilterService,
                    $interval:ng.IIntervalService,
                    private netService:Services.INetService,
                    private categoriesService:Services.ICategoriesService) {

            this.vm = this;
            this.filter = $filter("filter");
            this.loadAuctions();

            var updateInterval = $interval(()=> this.loadAuctions(), 1000 * 60);

            var listeners:Function[] = [];
            listeners.push($rootScope.$on('onCategorySelection', (event:angular.IAngularEvent, id:string)=> this.auctionsFilterByCategory(id)));
            listeners.push($rootScope.$on('onAuctionsChanged', (event:angular.IAngularEvent)=> this.loadAuctions()));
            listeners.push($rootScope.$on('onRemoveAuction', (event:angular.IAngularEvent, auctionId:string)=> this.removeAuction(auctionId)));

            $scope.$on('$destroy', ()=> listeners.forEach((listener:Function)=> listener()));
        }

        private loadAuctions() {
            this.netService.getAuctions().then((response)=> {
                this.auctions = response.data;
                this.setSelectedCategory();
                this.$rootScope.$emit('auctionsLoaded')
            });
        }

        private auctionsFilterByCategory(categoryId:string) {
            var id:number = parseInt(categoryId);
            if (id === 0 || !this.categoriesService.categories[categoryId] || !this.auctions) {
                this.vm.auctionsToShow = this.auctions;
                return;
            }

            this.vm.auctionsToShow = this.filter(this.auctions, {Category: {Id: categoryId}});
        }

        private removeAuction(auctionId:string):void {
            var auction:Services.IAuctionData[] = $.grep(this.auctionsToShow,
                (auction:Services.IAuctionData)=> auction.Id === auctionId);

            if (auction.length === 1) {
                this.removeElementFromArray<Services.IAuctionData>(this.auctions, auction[0]);
                this.removeElementFromArray<Services.IAuctionData>(this.auctionsToShow, auction[0]);
            }
        }

        private removeElementFromArray<T>(array:T[], element:T) {
            var index = array.indexOf(element);

            if (index > -1) {
                array.splice(index, 1);
            }
        }

        private setSelectedCategory():void {
            var queryVariables = this.$location.search();
            this.selectedCategory = (queryVariables["categoryId"] ? parseInt(queryVariables["categoryId"]) : 0);
            var selectedCategoryId:string = this.selectedCategory.toString();
            this.$rootScope.$emit('onCategorySelection', selectedCategoryId);
        }
    }
}