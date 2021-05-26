import { Arbitrable } from "./Arbitrable";
import { Court } from "./Court";

export type Dispute = {
    id: string,
    disputeID: string,

    arbitrable?: Arbitrable,
    subcourt?: Court,

    numberOfChoices?: string,
    period?: Period,
    lastPeriodChange?: string,
    drawsInRound?: string,
    commitsInRound?: string,
    ruled?: boolean,

    // latestRound: BigInt!
    // rounds: [DisputeRound!] ! @derivedFrom(field: "dispute")
}

export enum Period {
    Evidence = "Evidence",
    Commit = "Commit",
    Vote = "Vote",
    Appeal = "Appeal",
    Execution = "Execution"
}
  