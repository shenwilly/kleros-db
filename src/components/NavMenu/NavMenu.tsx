import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface NavMenuProps {
    label?: string;
    to?: string;
    active: boolean;
}

const NavMenu: React.FC<NavMenuProps> = ({ label, to, active }) => {  

    return (
        <NavLink to={`${to}`}>
            {active 
                ? <SelectedMenu>{label}</SelectedMenu>
                : <Menu>{label}</Menu>
            }
        </NavLink>
    );
};

const Menu = styled.span.attrs({
    className: 'mr4 pointer'
})`
    text-decoration: none! important;
`;

const SelectedMenu = styled.span.attrs({
    className: 'mr4 b underline pointer'
})``;

const NavLink = styled(Link).attrs({
    className: 'no-underline'
})`
    color: ${props => props.theme.purpleDarker}
`;

export default NavMenu;