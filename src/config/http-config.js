///<reference path="../_references.d.ts"/>
var NgAuctions;
(function (NgAuctions) {
    var Configuration;
    (function (Configuration) {
        angular.module(NgAuctions.moduleName).config(['$httpProvider',
            function ($httpProvider) {
                $httpProvider.interceptors.push('#authInterceptor');
            }]);
    })(Configuration = NgAuctions.Configuration || (NgAuctions.Configuration = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=http-config.js.map