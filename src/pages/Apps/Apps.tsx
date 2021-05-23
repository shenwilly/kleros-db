import React from "react";
import styled from "styled-components";
import Page from "../../components/Page";

const Apps: React.FC = () => {
    
    return (
    <Page>
        <Title>Apps</Title>
    </Page>
    );
};

const Title = styled.div.attrs({
    className: 'f4'
})``;

export default Apps;
