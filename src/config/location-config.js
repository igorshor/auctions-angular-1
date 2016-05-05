///<reference path="../_references.d.ts"/>
var NgAuctions;
(function (NgAuctions) {
    var Configuration;
    (function (Configuration) {
        angular.module(NgAuctions.moduleName).config(['$locationProvider',
            function ($locationProvider) {
                $locationProvider.html5Mode({
                    enabled: true,
                    requireBase: false
                });
            }]);
    })(Configuration = NgAuctions.Configuration || (NgAuctions.Configuration = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=location-config.js.map