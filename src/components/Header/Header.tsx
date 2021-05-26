import React from "react";
import styled from "styled-components";
import { Link, useLocation } from 'react-router-dom'
import Spacer from "../Spacer";
import NavMenu from "../NavMenu";
import SearchBar from "../SearchBar";
import { SearchProvider } from "../../contexts/Search";

const Header: React.FC = () => {    
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <HeaderGrid>
            <StyledLink to="/disputes">
                <HeaderTitle>
                    KlerosDB
                </HeaderTitle>
            </StyledLink>
            <NavMenu to="/disputes" label="Disputes" active={currentPath === "/disputes"} />
            <NavMenu to="/courts" label="Courts" active={currentPath === "/courts"} />
            <NavMenu to="/apps" label="Apps" active={currentPath === "/apps"} />
            <NavMenu to="/about" label="About" active={currentPath === "/about"} />
            <Spacer />

            <div className="mr4">
                <SearchProvider>
                    <SearchBar />
                </SearchProvider>
            </div>
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
})`
    color: ${props => props.theme.purpleDark}
`;

const StyledLink = styled(Link).attrs({
    className: 'no-underline'
})`
    color: ${props => props.theme.purpleDarker}
`;

export default Header;