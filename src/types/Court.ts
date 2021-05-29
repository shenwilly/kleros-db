export type Court = {
    id: string,
    subcourtID: string,
    hiddenVotes: boolean,
    minStake: string,
    alpha: string,
    feeForJuror: string,
    jurorsForCourtJump: string, // After a round has this number of jurors, the next appeal will be handled by parent court. If no parent court, no appeal is possible
    timesPerPeriod: string[],
    
    disputeCount: string,

    parent?: Court,
    children?: Court[],
}