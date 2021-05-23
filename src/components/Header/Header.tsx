import React from "react";
import styled from "styled-components";
import { FaToriiGate } from 'react-icons/fa';
import Spacer from "../Spacer";

const Header: React.FC = () => {    
  return (
    <HeaderGrid>
        <FaToriiGate className="f1"/>
        <Menu>
            Disputes
        </Menu>
        <Menu>
            Courts
        </Menu>
        <Menu>
            Apps
        </Menu>
        <Spacer/>
        <Menu>
            <FaToriiGate className="f1"/>
        </Menu>
    </HeaderGrid>
  );
};

const HeaderGrid = styled.div.attrs({
    className: "pa2 pl3 flex items-center",
})`
    border-bottom: 1px solid grey;
    background-color: rgb(25,25,25);
    color: white;
`;

const Menu = styled.span.attrs({
    className: 'mh2'
})``;

export default Header;
