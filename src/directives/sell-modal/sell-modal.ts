///<reference path="../../_references.d.ts"/>

module NgAuctions.Directives {
    import IAngularEvent = angular.IAngularEvent;
    angular.module(moduleName).directive('sellModal', ():ng.IDirective => {
        return {
            restrict: 'E',
            templateUrl: 'src/directives/sell-modal/sell-modal.html',
            scope: {},
            controller: SellModalController,
            controllerAs: 'vm',
            replace: true,
            bindToController: {}
        }
    });

    interface ISellModalFormValidation extends ng.IScope {
        sellForm:angular.IFormController;
    }

    interface ISellModalViewModel {
        product:Services.IProductData;
        futureDates:IFutureDate[];
        selectedFutureDate:IFutureDate;
        categories:Services.ICategoryData[]
        selectedCategory:Services.ICategoryData;
        addAndSaveBtn():void;
    }

    interface IFutureDate {
        futureDateString:string;
        futureDate:Date;
    }

    class SellModalController implements ISellModalViewModel {
        static $inject:string[] = ['$scope', '$rootScope', '$element', '#net', '#categories'];
        private vm:ISellModalViewModel;

        public product:Services.IProductData;
        public futureDates:IFutureDate[];
        public selectedFutureDate:IFutureDate;
        public categories:Services.ICategoryData[];
        public selectedCategory:Services.ICategoryData;

        constructor($scope:ISellModalFormValidation,
                    private $rootScope:ng.IRootScopeService,
                    $element:JQuery,
                    private netService:Services.INetService,
                    private categoriesService:Services.ICategoriesService) {
            this.vm = this;
            this.initData();

            $scope.$watch(() => this.selectedCategory, (newVal:Services.ICategoryData)=> {
                if (newVal) {
                    this.product.CategoryId = newVal.Id;
                }
            });

            $scope.$watch(() => this.selectedFutureDate, (newVal:IFutureDate)=> {
                if (newVal) {
                    this.product.EndTime = newVal.futureDate
                }
            });

            $element.on('show.bs.modal', ()=> {
                $scope.$apply(()=> {
                    this.resetForm();
                    $scope.sellForm.$setPristine();
                })
            })
        }

        private initData() {
            this.vm.categories = this.categoriesService.categories;

            this.vm.futureDates = [
                {futureDateString: '1 Day', futureDate: moment().add(1, 'days').toDate()},
                {futureDateString: '2 Days', futureDate: moment().add(2, 'days').toDate()},
                {futureDateString: '3 Days', futureDate: moment().add(3, 'days').toDate()},
                {futureDateString: '4 Days', futureDate: moment().add(4, 'days').toDate()},
                {futureDateString: '5 Days', futureDate: moment().add(5, 'days').toDate()},
                {futureDateString: '6 Days', futureDate: moment().add(5, 'days').toDate()},
                {futureDateString: '1 Week', futureDate: moment().add(1, 'weeks').toDate()},
                {futureDateString: '2 Weeks', futureDate: moment().add(2, 'weeks').toDate()},
                {futureDateString: '3 Weeks', futureDate: moment().add(3, 'weeks').toDate()},
                {futureDateString: '1 Month', futureDate: moment().add(1, 'months').toDate()},
                {futureDateString: '2 Months', futureDate: moment().add(2, 'months').toDate()},
                {futureDateString: '3 Months', futureDate: moment().add(3, 'months').toDate()},
                {futureDateString: '4 Months', futureDate: moment().add(4, 'months').toDate()}];
        }

        private resetForm() {
            var date:Date = moment().toDate();
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
                CategoryId: 1,
            };

            this.selectedCategory = this.categories[1];
            this.selectedFutureDate = this.futureDates[6];
        }

        public addAndSaveBtn() {
            this.netService.createAuction(this.product).then(()=> {
                this.$rootScope.$emit('onAuctionsChanged')
            });
        }
    }
}