import React from "react";
import styled from "styled-components";
import githubLogo from '../../assets/images/icon-github.png'
import graphLogo from '../../assets/images/icon-thegraph.png'

const Footer: React.FC = () => {
    
  return (
    <StyledFooter>
        <StyledLink href="https://thegraph.com/explorer/subgraph/shenwilly/kleros-liquid" target="blank">
            <img src={graphLogo} height="20px" width="20px" />
        </StyledLink>
        <StyledLink href="https://github.com/shenwilly/kleros-db" target="blank">
            <img src={githubLogo} height="20px" width="20px" />
        </StyledLink>
    </StyledFooter>
  );
};

const StyledFooter = styled.div.attrs({
    className: "w-100 tc pb3",
})``;

const StyledLink = styled.a.attrs({
    className: "ph2 pointer"
})``

export default Footer;