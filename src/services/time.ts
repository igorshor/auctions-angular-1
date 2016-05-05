///<reference path="../_references.d.ts"/>

module NgAuctions.Services {
    export interface ITimeService {
        getFormattedCountDown(endTime:Date):string;
    }

    class TimeService implements ITimeService {
        public getFormattedCountDown(endTime:Date):string {
            var diffTime:number = moment.utc(endTime).diff(moment());
            var duration:moment.Duration = moment.duration(diffTime);
            return `${Math.floor(duration.asHours())}h ${Math.floor(duration.asMinutes()) % 60}m `
        }
    }

    angular.module(moduleName).service('#time', TimeService)
}