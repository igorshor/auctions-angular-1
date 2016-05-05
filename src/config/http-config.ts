///<reference path="../_references.d.ts"/>

module NgAuctions.Configuration {
    angular.module(moduleName).config(['$httpProvider',
        ($httpProvider:ng.IHttpProvider)=> {
            $httpProvider.interceptors.push('#authInterceptor');
        }])
}