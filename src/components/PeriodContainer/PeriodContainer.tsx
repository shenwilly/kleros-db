import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Period } from "../../types/Dispute";

interface PeriodContainerProps {
    // todo: period enum 
    period?: Period,
    ruled?: boolean
}

const PeriodContainer: React.FC<PeriodContainerProps> = ({ period, ruled }) => {
  const [colorClass, setColorClass] = useState<string>("grey");

  useEffect(() => {
    let color: string = "red";
    if (ruled === true) {
      color = "rgb(66,3,159)";
    } else {
      switch (period) {
        case Period.Evidence:
          console.log("GA MASUK?")
          color = "green"
          break;
        case Period.Commit:
          color = "blue"
          break;
        case Period.Vote:
          color = "blue"
          break;
        case Period.Appeal:
          color = "red"
          break;
        case Period.Execution:
          color = "rgb(66,3,159)"
          break;
        default:
          break;
      }
    }
    
    setColorClass(color)
  }, [period, ruled]);

  // evidence green
  // commit blue
  // voting blue
  // appeal red
  // execution purple
  // ruled purple dark
    
  return (
    <StyledContainer style={{ backgroundColor: colorClass }}>
      { ruled === true
        ? 'Finalised'
        : `${period} Period`}
    </StyledContainer>
  );
};

const StyledContainer = styled.div.attrs({
    className: 'di white pv2 ph3 br4 b tc'
})`
    min-width: 170px;
    position: relative;
`;

export default PeriodContainer;