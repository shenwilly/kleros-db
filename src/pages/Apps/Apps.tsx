import React from "react";
import styled from "styled-components";
import AppCard from "../../components/AppCard";
import Page from "../../components/Page";
import { PageTitle, PageSubTitle } from "../../components/StyledComponents/StyledComponents";
import useArbitrable from "../../hooks/useArbitrable";
import { ArbitrableData } from "../../types/Arbitrable";

const Apps: React.FC = () => {
    const { arbitrables } = useArbitrable();
    const apps: ArbitrableData[] = arbitrables ?? [];
    
    return (
    <Page>
        <PageTitle>Apps</PageTitle>
        <PageSubTitle>
            Popular Apps
        </PageSubTitle>
        <StyledGrid>
            {  
                apps.map((app) => (
                    <a href={app.uri ?? ""} target="blank" key={app.arbitrable.id}>
                        <AppCard arbitrableData={app}/>
                    </a>
                ))
            }
        </StyledGrid>
    </Page>
    );
};

const StyledGrid = styled.div.attrs({
    className: 'db w-100'
})``;

export default Apps;
