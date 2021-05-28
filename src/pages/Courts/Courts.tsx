import { useQuery, gql } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import Page from "../../components/Page";
import Spinner from "../../components/Spinner";
import CourtCard from "../../components/CourtCard";
import { PageTitle, PageSubTitle, StyledLink } from "../../components/StyledComponents/StyledComponents";
import { Court } from "../../types/Court";

const Courts: React.FC = () => {
    const { loading, error, data } = useQuery<CourtsGQLResult>(COURTS_GQL);
    
    const courts = data?.courts ?? [];
    const popularCourts = data?.popularCourts ?? [];
    
    return (
    <Page>
        <PageTitle>Courts</PageTitle>

        {loading && 
            <LoadingScreen> 
                <Spinner/>
            </LoadingScreen>}
        {!loading && 
            <>
                <PageSubTitle>
                    Popular Courts
                </PageSubTitle>
                <StyledGrid>
                    {  
                        popularCourts.map((court) => (
                            <StyledLink to={`courts/${court.id}`} key={court.id}>
                                <CourtCard key={court.id} court={court}/>
                            </StyledLink>
                        ))
                    }
                </StyledGrid>
                <PageSubTitle>
                    All Courts
                </PageSubTitle>
                <StyledGrid>
                    {  
                        courts.map((court) => (
                            <StyledLink to={`courts/${court.id}`} key={court.id}>
                                <CourtCard key={court.id} court={court}/>
                            </StyledLink>
                        ))
                    }
                </StyledGrid>
            </>}
    </Page>
    );
};

interface CourtsGQLResult {
    courts: Court[],
    popularCourts: Court[],
}

const COURTS_GQL = gql`
    query courts {
        courts(orderBy: id, orderDirection: asc) {
            id
            subcourtID
            disputeCount
        }
        popularCourts:courts(first: 3, orderBy: disputeCount, orderDirection: desc) {
            id
            subcourtID
            disputeCount
        }
    }
`;

const StyledGrid = styled.div.attrs({
    className: 'db w-100 mt3'
})``;

const LoadingScreen = styled.div.attrs({
    className: "w-100 h-100 flex items-center justify-center"
})`
    height: 50vh;
`

export default Courts;
