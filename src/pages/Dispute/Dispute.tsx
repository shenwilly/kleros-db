import React from "react";
import styled from "styled-components";
import Page from "../../components/Page";
import DisputeCard from "../../components/DisputeCard";
import { useQuery, gql } from '@apollo/client';
import { Dispute } from "../../types/Dispute";

const LATEST_DISPUTES_GQL = gql`
    query latestDisputes {
        disputes(first: 9, orderBy: disputeID, orderDirection: desc) {
            id
            disputeID
            subcourt {
                id
                children
            }
            period
            ruled
        }
    }
`;

type Disputes = {
    disputes: Dispute[];
}
  
const DisputePage: React.FC = () => {
    // const { loading, error, data } = useQuery<Disputes>(LATEST_DISPUTES_GQL);
    
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error :(</p>;
    
    // const disputes = data?.disputes ?? [];
    // console.log(disputes);
    
    return (
        <Page>
            <Title>Dispute #761</Title>


        </Page>
    );
};

const Title = styled.div.attrs({
    className: 'f4'
})``;

const SubTitle = styled.div.attrs({
    className: 'mv3'
})``;

const SearchInput = styled.input.attrs({
    className: 'mt3 mb3 w-100 pv3'
})`
    width: 100%;
    text-indent: 16px;
    border: none;
    border-radius: 8px;
    background-color: rgba(250, 250, 250, 0.7);
    -webkit-box-shadow: 0px 6px 17px 1px rgba(0,0,0,0.2); 
    box-shadow: 0px 6px 15px 1px rgba(0,0,0,0.15);

    :focus-visible {
        outline: none;
    }
`;

const StatLabel = styled.span.attrs({
    className: 'f5 mr3'
})``;

interface ClassNameProps {
    className?: string;
}

const HalfBox = styled.div.attrs<ClassNameProps>(props => ({
    className: `dib h-100 w-100 w-50-gt-xs ${props.className}`
}))`
    height: '80px';
    border-radius: 8px;
`;

const WhiteBox = styled.div.attrs<ClassNameProps>(props => ({
    className: `bg-white br4 h-100 ${props.className}`
}))``;

const FullBox = styled.div.attrs({
    className: 'dib w-100 bg-white'
})`
    border-radius: 8px;
`;

const DisputeGrid = styled.div.attrs({
    className: 'db w-100'
})``;

export default DisputePage;
