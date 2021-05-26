import React from "react";
import styled from "styled-components";
import moment from 'moment';

interface TimeDisplayProps {
    duration?: number
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ duration }) => {
  let nextPeriod: string;

  if (duration && duration > 0) {
    nextPeriod = moment.duration(duration, 'seconds').humanize();
  } else {
    nextPeriod = "-";
  }
    
  return (
    <StyledTimeDisplay>
        {nextPeriod}
    </StyledTimeDisplay>
  );
};

const StyledTimeDisplay = styled.div.attrs({
    className: 'b'
})`
    color: ${props => props.theme.purpleDark}
`;

export default TimeDisplay;