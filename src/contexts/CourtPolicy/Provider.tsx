import React, { useState, useEffect, useCallback } from "react";
import Context from "./Context";
import { useQuery, gql } from '@apollo/client';
import { http } from "../../utils/http/http";
import { Policy, PolicyData } from "../../types/Policy";
import { getCourtFullName } from "../../utils/kleros-helpers/court";

const Provider: React.FC = ({ children }) => {
    const [ loaded, setLoaded ] = useState(false);
    const [ subcourtToPolicy, setSubcourtToPolicy ] = useState(new Map());
    const policyQuery = useQuery<Policies>(COURT_POLICIES_GQL);
    const policyQueryData = policyQuery.data;

    useEffect(() => {
      const fetchPolicies = async() => {
          let newSubcourtToPolicy: Map<string, PolicyData> = new Map();

          let promises: any[] = []
          policyQueryData?.policies.forEach((policyData) => {
            const uri = policyData.policy
            let url: string;
            if (uri.includes("http")) {
              url = uri;
            } else {
              url ="https://ipfs.kleros.io" + uri;
            }

            const subcourtID = policyData.subcourtID
            promises.push(http(url).then((policyData: PolicyData) => {
              policyData.uri = url;
              newSubcourtToPolicy.set(subcourtID, policyData);
            }));
          })
          
          await Promise.allSettled(promises);
          setSubcourtToPolicy(newSubcourtToPolicy);
          setLoaded(true);

          localStorage.setItem("subcourtToPolicy", JSON.stringify(Array.from(newSubcourtToPolicy.entries())));
      };

      const subCourtToPolicyString = localStorage.getItem("subcourtToPolicy");
      if (subCourtToPolicyString) {
        setSubcourtToPolicy(new Map(JSON.parse(subCourtToPolicyString)));
        setLoaded(true);
      }
      
      // TODO: 24H delay before refreshing data
      // if (recentlyLoaded) {
      //   return;
      // }

      if (policyQueryData) {
        fetchPolicies()
      }
    }, [policyQueryData]);
    
    const getCourtPolicy = useCallback((subcourtID: string): PolicyData | null => {
      if (!subcourtToPolicy.has(subcourtID)) {
        return null;
      }
      return subcourtToPolicy.get(subcourtID);
    }, [subcourtToPolicy]);

    const getCourtName = useCallback((subcourtID: string): string => {
      let name: string;
      let policy = getCourtPolicy(subcourtID);
      if (policy) {
        name = getCourtFullName(policy.name);
      } else {
        name = "-"
      }
      return name;
    }, [getCourtPolicy]);

    return (
        <Context.Provider
            value={{
              loaded,
              subcourtToPolicy,
              getCourtPolicy,
              getCourtName,
            }}>
            {children}
        </Context.Provider>
    );
};

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

export default Provider;