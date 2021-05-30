import React, { useCallback } from "react";
import Context from "./Context";
import { POH_SUBGRAPH_ENDPOINT } from "../../utils/constants/address";
import { getProofOfHumanitySubmissionURI } from "../../utils/kleros-helpers/arbitrables";

const Provider: React.FC = ({ children }) => {

    const getArbitrableSubmissionURI = useCallback(async (disputeID: string, arbitrableAddress: string): Promise<string> => {
        // TEMP: Proof of Humanity only
        if (arbitrableAddress !== "0xc5e9ddebb09cd64dfacab4011a0d5cedaf7c9bdb") {
            return "";
        }

        const url = POH_SUBGRAPH_ENDPOINT;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },                
            body: JSON.stringify({
                query: `
                    query fetchChallenge($disputeID: String!) {
                        challenges (
                          where: {
                            disputeID: $disputeID
                          }) {
                          requester
                        }
                    }                          
                `,
                variables: {
                    disputeID: disputeID,
                },
            })
        };

        let requester = ""
        let response = await fetch(url, options);
        let result = await response.json();
        let challenges = result.data.challenges;
        
        if (challenges.length > 0) {
            requester = challenges[0].requester;
        }

        let uri = getProofOfHumanitySubmissionURI(requester)

        return uri;
    }, []);

    return (
        <Context.Provider
            value={{
                getArbitrableSubmissionURI,
            }}>
            {children}
        </Context.Provider>
    );
};

export default Provider;