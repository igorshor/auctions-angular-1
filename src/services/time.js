///<reference path="../_references.d.ts"/>
var NgAuctions;
(function (NgAuctions) {
    var Services;
    (function (Services) {
        var TimeService = (function () {
            function TimeService() {
            }
            TimeService.prototype.getFormattedCountDown = function (endTime) {
                var diffTime = moment.utc(endTime).diff(moment());
                var duration = moment.duration(diffTime);
                return Math.floor(duration.asHours()) + "h " + Math.floor(duration.asMinutes()) % 60 + "m ";
            };
            return TimeService;
        }());
        angular.module(NgAuctions.moduleName).service('#time', TimeService);
    })(Services = NgAuctions.Services || (NgAuctions.Services = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=time.js.map