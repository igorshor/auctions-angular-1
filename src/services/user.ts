///<reference path="../_references.d.ts"/>

module NgAuctions.Services {
    export interface IUserService {
        userLoginName:string;
        userLoginPassword:string;
        userName:string;
    }

    class UserService implements IUserService {
        public userLoginName:string = 'superUser';
        public userLoginPassword:string = 'CB989279-AAEC-4EAA-8027-3BF67E05C3A3';
        public userName:string = 'Super User';
    }

    angular.module(moduleName).service('#user', UserService)
}