///<reference path="../_references.d.ts"/>
var NgAuctions;
(function (NgAuctions) {
    var Services;
    (function (Services) {
        var AuthInterceptor = (function () {
            function AuthInterceptor(base64Service, userService) {
                this.request = function (config) {
                    var encoded = base64Service.encode(userService.userLoginName + ':' + userService.userLoginPassword);
                    config.headers = config.headers || {};
                    config.headers['Authorization'] = 'Basic ' + encoded;
                    return config;
                };
            }
            AuthInterceptor.$inject = ['#base64', '#user'];
            return AuthInterceptor;
        }());
        angular.module(NgAuctions.moduleName).service('#authInterceptor', AuthInterceptor);
    })(Services = NgAuctions.Services || (NgAuctions.Services = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=auth-interceptor.js.map