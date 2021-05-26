import Archon from "@kleros/archon";
import { DisputeLog } from "../../types/DisputeLog";
import { MetaEvidenceLog } from "../../types/MetaEvidence";
import { RulingLog } from "../../types/Ruling";
import { INFURA_ENDPOINT, KLEROS_COURT_ADDRESS } from "../constants/address";

const archon = new Archon(INFURA_ENDPOINT);

export const getDisputeEventLog = async (disputeID: string, arbitrable: string): Promise<DisputeLog> => {
    return await archon.arbitrable.getDispute(
        arbitrable,
        KLEROS_COURT_ADDRESS,
        disputeID,
    );
};

export const getMetaEvidenceEventLog = async (metaEvidenceID: string, arbitrable: string): Promise<MetaEvidenceLog> => {
    return await archon.arbitrable.getMetaEvidence(
        arbitrable,
        metaEvidenceID
    );
};

export const getRulingEventLog = async (disputeID: string, arbitrable: string): Promise<RulingLog> => {
    return await archon.arbitrable.getRuling(
        arbitrable,
        KLEROS_COURT_ADDRESS,
        disputeID
    );
};

export const getIpfsFullURI = (URI: string): string => {
    let fullURI = URI;
    if (!fullURI.includes("http")) {
        fullURI = "https://ipfs.kleros.io" + fullURI;
    }
    return fullURI;
};
