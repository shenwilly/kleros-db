import React from "react";
import styled from "styled-components";
import Page from "../../components/Page";

const Apps: React.FC = () => {
    
    return (
    <Page>
        <Title>Apps</Title>
        <div className="flex justify-center items-center mt5 pt5 f3">
            <span>Page under construction</span>
        </div>
    </Page>
    );
};

const Title = styled.div.attrs({
    className: 'f4'
})``;

export default Apps;
