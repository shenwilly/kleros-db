export type Court = {
    id: string,
    subcourtID: string,
    hiddenVotes: boolean,
    minStake: string,
    alpha: string,
    feeForJuror: string,
    jurorsForCourtJump: string,
    timesPerPeriod: string[],
    
    disputeCount: string,

    parent?: Court,
    children?: Court[],
}