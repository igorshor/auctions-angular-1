///<reference path="../_references.d.ts"/>
var NgAuctions;
(function (NgAuctions) {
    var Services;
    (function (Services) {
        var UserService = (function () {
            function UserService() {
                this.userLoginName = 'superUser';
                this.userLoginPassword = 'CB989279-AAEC-4EAA-8027-3BF67E05C3A3';
                this.userName = 'Super User';
            }
            return UserService;
        }());
        angular.module(NgAuctions.moduleName).service('#user', UserService);
    })(Services = NgAuctions.Services || (NgAuctions.Services = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=user.js.map