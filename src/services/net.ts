///<reference path="../_references.d.ts"/>

module NgAuctions.Services {

    export interface IProductBasicData {
        Title:string;
        Description:string;
        StartTime:Date;
        EndTime:Date;
        StartBid:number;
        Picture1:string;
        Picture2:string;
        Picture3:string;
        Picture4:string;
    }

    export interface IAuctionData extends IProductBasicData {
        Id:string;
        IsItemNew:boolean;
        User:IUserData;
        Category:ICategoryData;
        HighestBid:IBidData;
        BidCount:number
    }

    export interface IProductData extends IProductBasicData {
        IsItemConditionNew:string;
        CategoryId:number;
    }

    export interface IUserData {
        Id:number;
        Name:string;
        Email:string;
        LastLoginTime:Date;
        CreatedOn:Date;
    }

    export interface ICategoryData {
        Id:number;
        Name:string;
    }

    export interface IBidData {
        Bid:number;
        BidTime:Date;
    }

    export interface INetService {
        getAuctions():ng.IHttpPromise<IAuctionData[]>;
        getAuction(id:string):ng.IHttpPromise<IAuctionData>;
        deleteAuction(id:string):ng.IHttpPromise<boolean>;
        createAuction(product:IProductData):ng.IHttpPromise<boolean>;
        addBid(auctionId:string, bid:IBidData):ng.IHttpPromise<boolean>;

    }

    class NetService implements INetService {
        static $inject:string[] = ['$http'];
        private baseUrl:string;

        constructor(private $http:ng.IHttpService) {
            this.baseUrl = 'http://localhost:3000/';
        }

        public getAuctions():ng.IHttpPromise<IAuctionData[]> {
            return this.$http.get(`${this.baseUrl}api/auctions`);
        }

        public getAuction(id:string):ng.IHttpPromise<IAuctionData> {
            return this.$http.get(`${this.baseUrl}api/auctions/${id}`);
        }

        public deleteAuction(id:string):ng.IHttpPromise<boolean> {
            return this.$http.delete(`${this.baseUrl}api/auctions/${id}`);
        }

        public createAuction(product:IProductData):ng.IHttpPromise<boolean> {
            return this.$http.post(`${this.baseUrl}api/auctions`, JSON.stringify(product));
        }

        public addBid(auctionId:string, bid:IBidData):ng.IHttpPromise<boolean> {
            return this.$http.post(`${this.baseUrl}api/bids/${auctionId}`, bid);
        }
    }

    angular.module(moduleName).service('#net', NetService);
}