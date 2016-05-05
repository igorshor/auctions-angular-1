///<reference path="../../_references.d.ts"/>

module NgAuctions.Directives {
    angular.module(moduleName).directive('picturesCarousel', ():ng.IDirective => {
        return {
            restrict: 'E',
            templateUrl: 'src/directives/pictures-carousel/pictures-carousel.html',
            scope: {},
            controller: PicturesCarouselController,
            controllerAs: 'vm',
            replace: true,
            bindToController: {
                pictures: '=',
            }
        }
    });

    interface IPicturesCarouselViewModel {
        mainPicture:string;
        pictures:string[];
        otherPictures:string[];
    }

    class PicturesCarouselController implements IPicturesCarouselViewModel {
        static $inject:string[] = ['$scope', '$element'];
        private vm:IPicturesCarouselViewModel;
        public mainPicture:string;
        public pictures:string[];
        public otherPictures:string[];

        constructor($scope:ng.IScope, $element:JQuery) {
            this.vm = this;
            $scope.$watch(()=> this.pictures, (newVal:string[])=> {
                if (this.otherPictures)
                    this.otherPictures.length = 0;

                if (newVal && newVal.length > 0) {
                    this.mainPicture = newVal[0];

                    if (newVal.length === 1) {
                        this.vm.otherPictures.push(newVal[0])
                    }
                    else {
                        this.vm.otherPictures   = newVal.slice(1, newVal.length)
                    }
                }
                else {
                    this.vm.mainPicture = '';
                    this.vm.otherPictures = [];
                }

                $element.carousel(0);
            })
        }
    }
}