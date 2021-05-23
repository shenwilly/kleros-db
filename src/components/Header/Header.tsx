import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Spacer from "../Spacer";

const Header: React.FC = () => {    
  return (
    <HeaderGrid>
        <HeaderTitle>
            Kleros Dashboard
        </HeaderTitle>
        <NavLink to="disputes">
            <SelectedMenu>
                Disputes
            </SelectedMenu>
        </NavLink>
        <NavLink to="courts">
            <Menu>
                Courts
            </Menu>
        </NavLink>
        <NavLink to="apps">
            <Menu>
                Apps
            </Menu>
        </NavLink>
        <Spacer/>
        <NavLink to="about">
            <Menu>
                About
            </Menu>
        </NavLink>
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

const Menu = styled.span.attrs({
    className: 'dn db-gt-xs mr4 pointer'
})`
    text-decoration: none!important
`;

const SelectedMenu = styled.span.attrs({
    className: 'dn db-gt-xs mr4 b underline pointer'
})``;

const NavLink = styled(Link).attrs({
    className: 'no-underline'
})`
    color: ${props => props.theme.purpleDarker}
`;

export default Header;