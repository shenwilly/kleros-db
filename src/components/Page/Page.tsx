import React from "react";
import styled from "styled-components";

const Page: React.FC = ({ children }) => {
    
  return (
    <StyledPage>
        {children}
    </StyledPage>
  );
};

const StyledPage = styled.div.attrs({
   className: "pa4",
})`
  width: 100%;
  height: 100%;
  background-color: #fff;
  background-image:
    radial-gradient(at top left, #D0DCFF, transparent),
    radial-gradient(at top right, #FFD4D2, transparent),
    radial-gradient(at bottom left, #E7F3F2, transparent);
`;

export default Page;