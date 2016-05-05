///<reference path="../_references.d.ts"/>

module NgAuctions.Configuration {
    angular.module(moduleName).config(['$locationProvider',
        ($locationProvider:ng.ILocationProvider)=> {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }])
}