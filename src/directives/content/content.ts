///<reference path="../../_references.d.ts"/>

module NgAuctions.Directives {
    import IAngularEvent = angular.IAngularEvent;
    angular.module(moduleName).directive('content', ():ng.IDirective => {
        return {
            restrict: 'E',
            templateUrl: 'src/directives/content/content.html',
            scope: {},
            controller: ContentWrapperController,
            controllerAs: 'vm',
            replace: false,
            bindToController: {}
        };
    });

    interface IContentWrapperViewModel {
        category:string;
    }

    class ContentWrapperController implements IContentWrapperViewModel {
        static $inject:string[] = ['$scope', '$rootScope', '#categories'];
        private vm:IContentWrapperViewModel;
        public category:string;

        constructor($scope:ng.IScope,
                    $rootScope:ng.IRootScopeService,
                    categoriesService:Services.ICategoriesService) {
            this.vm = this;
            var listener:Function = $rootScope.$on('onCategorySelection',
                (event:IAngularEvent, id:number)=> this.vm.category = categoriesService.categories[id].Name);
            $scope.$on('$destroy', ()=> listener());
        }
    }
}