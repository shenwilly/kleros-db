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
            <NavMenu to="/about" label="About" active={currentPath === "/about"} />
            <Spacer />
            <SearchInput placeholder="Search Dispute by ID  🔍" type="input"/>
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

const SearchInput = styled.input.attrs({
    className: 'mr4 w-100'
})`
    min-width: 210px;
    max-width: 300px;
    text-indent: 15px;
    border: none;
    border-radius: 40px;
    background-color: rgba(250, 250, 250, 0.7);
    -webkit-box-shadow: 0px 6px 17px 1px rgba(0,0,0,0.2); 
    box-shadow: 0px 6px 15px 1px rgba(0,0,0,0.15);
    padding: 10px 0 10px 0;

    :focus-visible {
        outline: none;
    }
`;

export default Header;