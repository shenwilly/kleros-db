import React from "react";
import styled from "styled-components";
import { useLocation } from 'react-router-dom'
import Spacer from "../Spacer";
import NavMenu from "../NavMenu";

const Header: React.FC = () => {    
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <HeaderGrid>
            <HeaderTitle>
                Kleros Dashboard
            </HeaderTitle>
            <NavMenu to="/disputes" label="Disputes" active={currentPath === "/disputes"} />
            <NavMenu to="/courts" label="Courts" active={currentPath === "/courts"} />
            <NavMenu to="/apps" label="Apps" active={currentPath === "/apps"} />
            <Spacer/>
            <NavMenu to="/about" label="About" active={currentPath === "/about"} />
        </HeaderGrid>
    );
};

const HeaderGrid = styled.div.attrs({
    className: "pa2 pl4 flex items-center",
})`
    color: ${props => props.theme.purpleDarker}
`;

const HeaderTitle = styled.span.attrs({
    className: 'f4 mr4 b'
})``;

export default Header;