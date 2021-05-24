import React, { useCallback, useState, useEffect } from "react";
import Context from "./Context";
import { useQuery, gql } from '@apollo/client';
import { http } from "../../utils/http/http";
import { Policy } from "../../types/Policy";

const Provider: React.FC = ({ children }) => {
    const [ loaded, setLoaded ] = useState(false);
    const [ subcourtToPolicy, setSubcourtToPolicy ] = useState(new Map());
    const policyQuery = useQuery<Policies>(COURT_POLICIES_GQL);
    const policyData = policyQuery.data;

    useEffect(() => {
      const fetchPolicies = async() => {
          let newSubcourtToPolicy: Map<string, string> = new Map();

          let promises: any[] = []
          policyData?.policies.forEach((policyData) => {
            const uri = policyData.policy
            let url: string;
            if (uri.includes("http")) {
              url = uri;
            } else {
              url ="https://ipfs.kleros.io" + uri;
            }

            const subcourtID = policyData.subcourtID
            promises.push(http(url).then(response => {
              subcourtToPolicy.set(subcourtID, response);
            }));
          })
          
          await Promise.allSettled(promises);
          setSubcourtToPolicy(newSubcourtToPolicy);
          setLoaded(true);
      };

      if (policyData) {
        fetchPolicies()
      }
    }, [policyData]);

    return (
        <Context.Provider
            value={{
              loaded,
              subcourtToPolicy
            }}>
            {children}
        </Context.Provider>
    );
};

export default Provider;

const COURT_POLICIES_GQL = gql`
    query courtPolicies {
      policies {
        subcourtID
        policy
      }
    }
`;

type Policies = {
  policies: Policy[];
}