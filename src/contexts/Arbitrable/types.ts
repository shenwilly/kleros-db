export interface ContextValues {
    getArbitrableSubmissionURI: (disputeID: string, arbitrableAddress: string) => Promise<string>,
}
