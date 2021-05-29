import React from "react";
import styled from "styled-components";
import Page from "../../components/Page";
import DisputeCard from "../../components/DisputeCard";
import { useQuery, gql } from '@apollo/client';
import { Dispute } from "../../types/Dispute";
import Spinner from "../../components/Spinner";
import { PageTitle, PageSubTitle, StyledLink } from "../../components/StyledComponents/StyledComponents";

const DisputesPage: React.FC = () => {
    const { loading, error, data } = useQuery<DisputesGQLResult>(LATEST_DISPUTES_GQL);
    
    const latestDisputes = data?.latest ?? [];
    const appealDisputes = data?.appeal ?? [];
    
    return (
        <Page>
            <PageTitle>Disputes</PageTitle>

            {/* filter & sort */}

            {loading && 
                <LoadingScreen> 
                    <Spinner/>
                </LoadingScreen>}
            {!loading && 
                <>
                    <PageSubTitle>
                        Latest Disputes
                    </PageSubTitle>
                    <StyledGrid>
                        {  
                            latestDisputes.map((dispute) => (
                                <StyledLink to={`disputes/${dispute.id}`} key={dispute.id}>
                                    <DisputeCard key={dispute.id} dispute={dispute}/>
                                </StyledLink>
                            ))
                        }
                    </StyledGrid>
                    <PageSubTitle>
                        Disputes in Appeal Period
                    </PageSubTitle>
                    <StyledGrid>
                        {  
                            appealDisputes.map((dispute) => (
                                <StyledLink to={`disputes/${dispute.id}`} key={dispute.id}>
                                    <DisputeCard key={dispute.id} dispute={dispute}/>
                                </StyledLink>
                            ))
                        }
                    </StyledGrid>
                </>}
        </Page>
    );
};

interface DisputesGQLResult {
    latest: Dispute[],
    appeal: Dispute[]
}

const LATEST_DISPUTES_GQL = gql`
    query latestDisputes {
        latest:disputes(first: 6, orderBy: disputeID, orderDirection: desc) {
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
        appeal:disputes(where: { period: "Appeal" }, orderBy: lastPeriodChange, orderDirection: asc) {
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

// interface ClassNameProps {
//     className?: string;
// }

// const HalfBox = styled.div.attrs<ClassNameProps>(props => ({
//     className: `dib h-100 w-100 w-50-gt-xs ${props.className}`
// }))`
//     height: '80px';
//     border-radius: 8px;
// `;

const StyledGrid = styled.div.attrs({
    className: 'db w-100'
})``;

const LoadingScreen = styled.div.attrs({
    className: "w-100 h-100 flex items-center justify-center"
})`
    height: 50vh;
`

export default DisputesPage;
