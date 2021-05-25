import React, { useState, useEffect } from "react";
import Context from "./Context";
import { useLazyQuery, gql } from '@apollo/client';
import { Dispute } from "../../types/Dispute";

const Provider: React.FC = ({ children }) => {
    const [ query, setQuery ] = useState<string>("");
    const [ getSearchResult, { loading, data }] = useLazyQuery<DisputesGQLResult>(
        SEARCH_DISPUTES_GQL,
        { variables: { disputeID: query } }
    );

    useEffect(() => {
        if (query.length === 0) return;
        
        const search = async() => {
            console.log("searching...");
            getSearchResult()
        };
      
        const timeOut = setTimeout(() => search(), 700);
        return () => clearTimeout(timeOut);
    }, [query, getSearchResult]);

    return (
        <Context.Provider
            value={{
              loading,
              query,
              results: data?.disputes ?? [],
              setQuery
            }}>
            {children}
        </Context.Provider>
    );
};

interface DisputesGQLResult {
    disputes: Dispute[]
}

const SEARCH_DISPUTES_GQL = gql`
    query searchDisputes($disputeID: String!) {
        disputes(
            where: {
                id: $disputeID
            }
            first: 5, orderBy: disputeID, orderDirection: desc) {
            id
            disputeID
            subcourt {
                id
            }
        }
    }
`;

export default Provider;