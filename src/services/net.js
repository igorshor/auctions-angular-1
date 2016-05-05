///<reference path="../_references.d.ts"/>
var NgAuctions;
(function (NgAuctions) {
    var Services;
    (function (Services) {
        var NetService = (function () {
            function NetService($http) {
                this.$http = $http;
                this.baseUrl = '//auctions-igorshor.c9users.io/';
            }
            NetService.prototype.getAuctions = function () {
                return this.$http.get(this.baseUrl + "api/auctions");
            };
            NetService.prototype.getAuction = function (id) {
                return this.$http.get(this.baseUrl + "api/auctions/" + id);
            };
            NetService.prototype.deleteAuction = function (id) {
                return this.$http.delete(this.baseUrl + "api/auctions/" + id);
            };
            NetService.prototype.createAuction = function (product) {
                return this.$http.post(this.baseUrl + "api/auctions", JSON.stringify(product));
            };
            NetService.prototype.addBid = function (auctionId, bid) {
                return this.$http.post(this.baseUrl + "api/bids/" + auctionId, bid);
            };
            NetService.$inject = ['$http'];
            return NetService;
        }());
        angular.module(NgAuctions.moduleName).service('#net', NetService);
    })(Services = NgAuctions.Services || (NgAuctions.Services = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=net.js.map