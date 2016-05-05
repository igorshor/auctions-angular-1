///<reference path="../../_references.d.ts"/>

module NgAuctions.Directives {
    angular.module(moduleName).directive('category', ():ng.IDirective => {
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

    interface ICategoryViewModel {
        categoryId:string;
        categoryName:string;
        categoryNameUpperCase:string;
        categoryNameLowerCase:string;
        categoryHaveImage:boolean;
        categorySelected:boolean;
        onCategoryClick():void;
    }

    class CategoryController implements ICategoryViewModel {
        static $inject:string[] = ['$scope', '$rootScope', '$location'];

        private vm:ICategoryViewModel;

        public categoryId:any;
        public categoryName:string;
        public categoryNameUpperCase:string;
        public categoryNameLowerCase:string;
        public categoryHaveImage:boolean;
        public categorySelected:boolean;

        constructor($scope:ng.IScope,
                    private $rootScope:ng.IRootScopeService,
                    private $location:ng.ILocationService) {
            this.vm = this;

            var listener:Function = $rootScope.$on('onCategorySelection', (id)=> this.categorySelected = id === this.categoryId);
            $scope.$on('$destroy', ()=> listener());

            this.initCategory();
        }

        private initCategory() {
            this.vm.categoryNameUpperCase = this.categoryName.toUpperCase();
            this.vm.categoryNameLowerCase = this.categoryName.toLowerCase().replace(' ', '-').replace('.', '');
            this.vm.categoryHaveImage = this.categoryId > 0;
            this.vm.categorySelected = false;
        }

        public onCategoryClick():void {
            this.$location.search({'categoryId': this.categoryId !== '0' ? this.categoryId : null});
            this.$rootScope.$emit('onCategorySelection', this.categoryId);
        }
    }
}