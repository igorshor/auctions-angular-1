///<reference path="../../_references.d.ts"/>
var NgAuctions;
(function (NgAuctions) {
    var Directives;
    (function (Directives) {
        angular.module(NgAuctions.moduleName).directive('picturesCarousel', function () {
            return {
                restrict: 'E',
                templateUrl: 'src/directives/pictures-carousel/pictures-carousel.html',
                scope: {},
                controller: PicturesCarouselController,
                controllerAs: 'vm',
                replace: true,
                bindToController: {
                    pictures: '='
                }
            };
        });
        var PicturesCarouselController = (function () {
            function PicturesCarouselController($scope, $element) {
                var _this = this;
                this.vm = this;
                $scope.$watch(function () { return _this.pictures; }, function (newVal) {
                    if (_this.otherPictures)
                        _this.otherPictures.length = 0;
                    if (newVal && newVal.length > 0) {
                        _this.mainPicture = newVal[0];
                        if (newVal.length === 1) {
                            _this.vm.otherPictures.push(newVal[0]);
                        }
                        else {
                            _this.vm.otherPictures = newVal.slice(1, newVal.length);
                        }
                    }
                    else {
                        _this.vm.mainPicture = '';
                        _this.vm.otherPictures = [];
                    }
                    $element.carousel(0);
                });
            }
            PicturesCarouselController.$inject = ['$scope', '$element'];
            return PicturesCarouselController;
        }());
    })(Directives = NgAuctions.Directives || (NgAuctions.Directives = {}));
})(NgAuctions || (NgAuctions = {}));
//# sourceMappingURL=pictures-carousel.js.map