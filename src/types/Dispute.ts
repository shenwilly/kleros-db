import { Arbitrable } from "./Arbitrable";
import { Court } from "./Court";

export type Dispute = {
    id: string;
    disputeID: BigInteger;

    arbitrable?: Arbitrable;
    subcourt?: Court;
    
    numberOfChoices?: BigInteger;
    period?: Period;
    lastPeriodChange?: BigInteger;
    drawsInRound?: BigInteger;
    commitsInRound?: BigInteger;
    ruled?: boolean;

    // latestRound: BigInt!
    // rounds: [DisputeRound!] ! @derivedFrom(field: "dispute")
}

export enum Period {
    Evidence = "Evidence",
    Commit = "Commit",
    Vote = "Vote",
    Appeal = "Appeal",
    Execution = "Execution",
}
  