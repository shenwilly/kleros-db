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
    let color: string = "";
    
    if (ruled === true) {
      color = "rgb(144,20,254)";
    } else {
      switch (period) {
        case Period.Evidence:
          color = "#19A974"
          break;
        case Period.Commit:
          color = "#357EDD"
          break;
        case Period.Vote:
          color = "#357EDD"
          break;
        case Period.Appeal:
          color = "#FF4136"
          break;
        case Period.Execution:
          color = "rgb(144,20,254)"
          break;
        default:
          break;
      }
    }
    
    setColorClass(color)
  }, [period, ruled]);
    
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