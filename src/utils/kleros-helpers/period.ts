import { Dispute, Period } from "../../types/Dispute";
import moment from 'moment';

export const periodToNumber = (period: Period): number => {
    let periodNum: number = 0;
    switch (period) {
        case "Evidence":
            periodNum = 0;
            break;
        case "Commit":
            periodNum = 1;
            break;
        case "Vote":
            periodNum = 2;
            break;
        case "Appeal":
            periodNum = 3;
            break;
        case "Execution":
            periodNum = 4;
            break;
        default:
            break;
    }
    return periodNum;
}

export const getTimeUntilNextPeriod = (dispute: Dispute): number => {
    const timesPerPeriod = dispute.subcourt?.timesPerPeriod!;
    const period = periodToNumber(dispute.period!);
    const periodDuration = Number(timesPerPeriod[period]);
    const lastPeriodChange = Number(dispute.lastPeriodChange!);
    const now = moment().unix();
    const nextPeriodChange =  lastPeriodChange + periodDuration;
    return nextPeriodChange - now;
}