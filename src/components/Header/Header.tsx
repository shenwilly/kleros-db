import React, { useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from 'react-router-dom'
import Spacer from "../Spacer";
import NavMenu from "../NavMenu";
import SearchBar from "../SearchBar";
import { SearchProvider } from "../../contexts/Search";
import { GrClose, GrMenu } from "react-icons/gr";

const Header: React.FC = () => {    
    const location = useLocation();
    const currentPath = location.pathname;
    const [ showMobileMenu, setShowMobileMenu ] = useState<boolean>(false);

    const paths = [
        { to: "/disputes", label: "Disputes" },
        { to: "/courts", label: "Courts" },
        { to: "/apps", label: "Apps" },
        { to: "/about", label: "About" },
    ]

    return (
        <>
            <HeaderGrid>
                <StyledLink to="/disputes">
                    <HeaderTitle>
                        KlerosDB
                    </HeaderTitle>
                </StyledLink>
                <div className="dn db-gt-xs">
                    {paths.map((path) => (
                        <NavMenu 
                            to={path.to}
                            label={path.label} 
                            active={currentPath === path.to || (path.to === "/disputes" && currentPath === "/")} />
                    ))}
                </div>
                <Spacer />
                <div className="db dn-gt-xs mr4">
                    <GrMenu onClick={() => setShowMobileMenu(true)}/>
                    { showMobileMenu &&
                        <MobileMenuPicker>
                            <div className="tr pa3">
                                <GrClose className="f4" onClick={() => setShowMobileMenu(false)}/>
                            </div>
                            {paths.map((path) => (
                                <MobileNavMenu 
                                    to={path.to} 
                                    onClick={() => setShowMobileMenu(false)}>
                                    {path.label}
                                </MobileNavMenu>
                            ))}
                        </MobileMenuPicker>}
                </div>
                <div className="dn db-gt-xs mr4">
                    <SearchProvider>
                        <SearchBar />
                    </SearchProvider>
                </div>
            </HeaderGrid>
            <div className="db dn-gt-xs w-100 tc mt2">
                <SearchProvider>
                    <SearchBar />
                </SearchProvider>
            </div>
        </>
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

const MobileMenuPicker = styled.div.attrs({
    className: 'w-100 pb3'
})`
    z-index: 200;
    background-color: ${props => props.theme.purpleLighter};
    position: fixed;
    top: 0;
    left: 0;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    -webkit-box-shadow: 0 6px 8px 5px rgba(0,0,0,0.2); 
    box-shadow: 0 6px 8px 5px rgba(0,0,0,0.2);
`;

const MobileNavMenu = styled(Link).attrs({
    className: 'tc pv3 db'
})``;

export default Header;