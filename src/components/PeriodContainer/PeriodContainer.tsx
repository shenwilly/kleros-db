import React from "react";
import styled from "styled-components";

interface PeriodContainerProps {
    // todo: period enum 
    period?: string
}

const PeriodContainer: React.FC<PeriodContainerProps> = ({ period }) => {
    
  return (
    <StyledContainer>
        {period} Period
    </StyledContainer>
  );
};

const StyledContainer = styled.div.attrs({
    className: 'di bg-green white pv2 ph3 br4 b'
})`
    position: relative;
`;

export default PeriodContainer;