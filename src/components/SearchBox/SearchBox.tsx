import React from "react";
import styled from "styled-components";
import { CgSpinner } from "react-icons/cg";
import SearchResultCard from "../SearchResultCard";
import useSearch from "../../hooks/useSearch";
import { useHistory } from "react-router-dom";
import useCourts from "../../hooks/useCourts";

const SearchBox: React.FC = () => {
    const { subcourtToPolicy } = useCourts();
    const { results, loading, setQuery } = useSearch();
    const history = useHistory();
    const disputes = results;

    const handleOnClick = (disputeID: string) => {
        history.push(`/disputes/${disputeID}`);
        setQuery("");
    }

    const getCourtName = (subcourtID: string): string => {
        // TODO: temp
        let courtName: string = "";

        if (subcourtID.length > 0 && subcourtToPolicy.has(subcourtID)) {
            courtName = subcourtToPolicy.get(subcourtID)?.name ?? "";
            if (courtName.length > 0 && !courtName.toLowerCase().includes("court")) {
                courtName = courtName + " Court";
            }
        }

        return courtName;
    }
    
    return (
        <SearchResult>
            { loading && 
                <div className="tc pv2">
                    <CgSpinner className="f3 rotate-center"/>
                </div>}
            { !loading && disputes.length === 0 && 
                <div className="tc pv2">
                    <span>Dispute not found</span>
                </div>}
            { !loading && disputes.length > 0 && 
                disputes.map((dispute) => {
                    const courtName = getCourtName(dispute?.subcourt?.id ?? "");
                    return (
                        <SearchResultCard 
                            key={dispute.id}
                            title={`Dispute #${dispute.id}`}
                            subtitle={courtName}
                            onClick={() => handleOnClick(dispute.id)}/>
                    )
                })
            }
        </SearchResult>
    );
};

const SearchResult = styled.div.attrs({
    className: 'absolute bg-white w-100 br3 pa2'
})`
    z-index: 100;
    top: 50px;
    border: none;
    background-color: rgba(250, 250, 250);
    -webkit-box-shadow: 0px 3px 10px 1px rgba(0,0,0,0.15); 
    box-shadow: 0px 3px 10px 1px rgba(0,0,0,0.15);
`;

export default SearchBox;