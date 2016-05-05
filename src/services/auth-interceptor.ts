///<reference path="../_references.d.ts"/>

module NgAuctions.Services {
    interface IAuthInterceptor {
        request:(config:angular.IRequestConfig)=>{}
    }

    class AuthInterceptor implements IAuthInterceptor {
        static $inject:string[] = ['#base64', '#user'];
        public request:(config:angular.IRequestConfig)=>{};

        constructor(base64Service:IBase64Service, userService:IUserService) {

            this.request = (config:angular.IRequestConfig)=> {
                var encoded = base64Service.encode(userService.userLoginName + ':' + userService.userLoginPassword);
                config.headers = config.headers || {};
                config.headers['Authorization'] = 'Basic ' + encoded;

                return config;
            }
        }
    }

    angular.module(moduleName).service('#authInterceptor', AuthInterceptor);
}