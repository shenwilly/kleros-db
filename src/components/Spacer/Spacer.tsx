import React from "react";
import styled from "styled-components";

interface SpacerProp {
  className?: string,
}

const Spacer: React.FC<SpacerProp> = ({ className }: { className?: string }) => {
    
  return (
    <>
      <div className={className} />
    </>
  );
};

const StyledSpacer = styled(Spacer)`
    height: 100%;
    width: 100%;
`

export default StyledSpacer;