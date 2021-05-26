import React from "react";
import styled from "styled-components";
import Page from "../../components/Page";
import DisputeCard from "../../components/DisputeCard";
import { useQuery, gql } from '@apollo/client';
import { Dispute } from "../../types/Dispute";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";

const DisputesPage: React.FC = () => {
    const { loading, error, data } = useQuery<DisputesGQLResult>(LATEST_DISPUTES_GQL);
    
    const disputes = data?.disputes ?? [];
    
    return (
        <Page>
            <Title>Disputes</Title>
            <SubTitle>
                Latest Disputes
            </SubTitle>

            {loading && 
                <LoadingScreen> 
                    <Spinner/>
                </LoadingScreen>}
            {!loading && 
                <DisputeGrid>
                    {  
                        disputes.map((dispute) => (
                            <StyledLink to={`disputes/${dispute.id}`} key={dispute.id}>
                                <DisputeCard key={dispute.id} dispute={dispute}/>
                            </StyledLink>
                        ))
                    }
                </DisputeGrid>}
        </Page>
    );
};

interface DisputesGQLResult {
    disputes: Dispute[]
}

const LATEST_DISPUTES_GQL = gql`
    query latestDisputes {
        disputes(first: 9, orderBy: disputeID, orderDirection: desc) {
            id
            disputeID
            subcourt {
                id
                timesPerPeriod
            }
            lastPeriodChange
            period
            ruled
        }
    }
`;

const Title = styled.div.attrs({
    className: 'f4'
})``;

const SubTitle = styled.div.attrs({
    className: 'mv3'
})``;

// interface ClassNameProps {
//     className?: string;
// }

// const HalfBox = styled.div.attrs<ClassNameProps>(props => ({
//     className: `dib h-100 w-100 w-50-gt-xs ${props.className}`
// }))`
//     height: '80px';
//     border-radius: 8px;
// `;

const DisputeGrid = styled.div.attrs({
    className: 'db w-100'
})``;

const StyledLink = styled(Link).attrs({
    className: 'no-underline'
})`
    color: ${props => props.theme.textColor}
`;

const LoadingScreen = styled.div.attrs({
    className: "w-100 h-100 flex items-center justify-center"
})`
    height: 50vh;
`

export default DisputesPage;
