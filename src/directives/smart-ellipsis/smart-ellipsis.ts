///<reference path="../../_references.d.ts"/>

module NgAuctions.Directives {
    import IAugmentedJQuery = angular.IAugmentedJQuery;
    angular.module(moduleName).directive('smartEllipsis', ():ng.IDirective => {
        return {
            restrict: 'A',
            scope: true,
            controller: SmartEllipsisController,
        };
    });


    interface ISmartEllipsisViewModel {
    }

    class SmartEllipsisController implements ISmartEllipsisViewModel {
        static $inject:string[] = ['$element', '$scope'];

        constructor($element:JQuery, $scope:ng.IScope) {
            $scope.$watch(()=> $element.dotdotdot({watch: true}));
        }
    }
}