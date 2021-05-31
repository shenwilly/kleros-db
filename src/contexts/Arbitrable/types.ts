import { ArbitrableData } from "../../types/Arbitrable";

export interface ContextValues {
    arbitrables: ArbitrableData[],
    getArbitrableSubmissionURI: (disputeID: string, arbitrableAddress: string) => Promise<string>,
}
