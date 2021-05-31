import React, { useCallback, useState } from "react";
import Context from "./Context";
import { POH_SUBGRAPH_ENDPOINT } from "../../utils/constants/address";
import { getProofOfHumanitySubmissionURI } from "../../utils/kleros-helpers/arbitrables";
import { ArbitrableData } from "../../types/Arbitrable";
import { useEffect } from "react";
import pohLogo from '../../assets/images/icon-poh.png'
import tcrLogo from '../../assets/images/icon-tcr.png'
import omenLogo from '../../assets/images/icon-omen.png'
import realityLogo from '../../assets/images/icon-realitio.png'

const Provider: React.FC = ({ children }) => {
    const [ arbitrables, setArbitrables ] = useState<ArbitrableData[]>([]);

    useEffect(() => {
        setArbitrables([
            {
                name: "Proof of Humanity",
                arbitrable: {
                    id: "0xc5e9ddebb09cd64dfacab4011a0d5cedaf7c9bdb"
                },
                iconUri: pohLogo,
                uri: "http://proofofhumanity.id/"
            },
            {
                name: "Kleros Tokens",
                arbitrable: {
                    id: "tempKlerosTokensID"
                },
                iconUri: tcrLogo,
                uri: "https://tokens.kleros.io/"
            },
            {
                name: "Omen Prediction Market",
                arbitrable: {
                    id: "tempOmenID"
                },
                iconUri: omenLogo,
                uri: "https://omen.eth.link/"
            },
            {
                name: "reality.eth",
                arbitrable: {
                    id: "tempRealityID"
                },
                iconUri: realityLogo,
                uri: "https://omen.eth.link/"
            },
        ])
    }, []);

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
                arbitrables,
                getArbitrableSubmissionURI,
            }}>
            {children}
        </Context.Provider>
    );
};

export default Provider;