import React from "react";
import styled from "styled-components";
import Page from "../../components/Page";

const About: React.FC = () => {
    
    return (
    <Page>
        <Title>About</Title>
    </Page>
    );
};

const Title = styled.div.attrs({
    className: 'f4'
})``;

export default About;
