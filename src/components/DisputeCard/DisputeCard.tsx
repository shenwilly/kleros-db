import React from "react";
import styled from "styled-components";
import Spacer from "../Spacer";
import NavMenu from "../NavMenu";

const DisputeCard: React.FC = () => {    
    return (
        <>
            <Padding>
                <Card>
                    <div>
                        #711
                    </div>
                    <div>
                        Humanity Court
                    </div>
                    <div>
                        Evidence Period
                    </div>
                </Card>
            </Padding>   
        </>
    );
};

const Padding = styled.div.attrs({
    className: 'dib w-50 w-third-gt-xs ph3 pb3'
})`

`;

const Card = styled.div.attrs({
    className: 'dib br3 w-100 pa3 bg-white'
})`
    -webkit-box-shadow: 1px 3px 8px 1px rgba(0,0,0,0.2); 
    box-shadow: 1px 3px 8px 1px rgba(0,0,0,0.15);
`;

const HeaderGrid = styled.div.attrs({
    className: "pa2 pl4 flex items-center",
})`
    color: ${props => props.theme.purpleDarker}
`;

const HeaderTitle = styled.span.attrs({
    className: 'f4 mr4 b'
})``;

export default DisputeCard;