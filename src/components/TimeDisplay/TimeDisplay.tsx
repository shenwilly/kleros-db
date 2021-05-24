import React from "react";
import styled from "styled-components";

interface TimeDisplayProps {
    // todo: timestamp / date type
    duration?: string
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ duration }) => {
    
  return (
    <StyledTimeDisplay>
        {duration}
    </StyledTimeDisplay>
  );
};

const StyledTimeDisplay = styled.div.attrs({
    className: 'b'
})`
    color: ${props => props.theme.purpleDark}
`;

export default TimeDisplay;