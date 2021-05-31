export type Arbitrable = {
    id: string,
    disputeCount?: string,
}

export type ArbitrableData = {
    arbitrable: Arbitrable,
    name: string,
    uri?: string,
    iconUri?: string,
    baseColor?: string,
}