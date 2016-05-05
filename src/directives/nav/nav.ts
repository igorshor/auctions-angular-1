///<reference path="../../_references.d.ts"/>

module NgAuctions.Directives {
    import ICategoryData = NgAuctions.Services.ICategoryData;
    angular.module(moduleName).directive('nav', ():ng.IDirective => {
        return {
            restrict: 'E',
            templateUrl: 'src/directives/nav/nav.html',
            scope: {},
            controller: NavigationController,
            controllerAs: 'vm',
            replace: false,
            bindToController: {}
        };
    });

    interface INavigationViewModel {
        categories:ICategoryData[]
    }

    class NavigationController implements INavigationViewModel {
        static $inject:string[] = ['#categories'];
        private vm:INavigationViewModel;
        public categories:Services.ICategoryData[];

        constructor(categoriesService:Services.ICategoriesService) {
            this.vm = this;
            this.vm.categories = categoriesService.categories;
        }
    }
}