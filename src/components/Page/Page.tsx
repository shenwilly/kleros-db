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
   className: "ph4 pa3",
})`
  width: 100%;
  height: 100%;
`;

export default Page;