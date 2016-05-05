///<reference path="../../_references.d.ts"/>

module NgAuctions.Directives {
    angular.module(moduleName).directive('header', ():ng.IDirective => {
        return {
            restrict: 'E',
            templateUrl: 'src/directives/header/header.html',
            scope: {},
            controller: HeaderController,
            controllerAs: 'vm',
            replace: false,
            bindToController: {}
        };
    });

    interface IHeaderViewModel {
        user:string;
    }

    class HeaderController implements IHeaderViewModel {
        static $inject:string[] = ['$rootScope', '#user'];
        private vm:IHeaderViewModel;
        public user:string;

        constructor(private $rootScope:ng.IRootScopeService,
                    userService:Services.IUserService) {
            this.vm = this;
            this.vm.user = userService.userName
        }
    }
}