import React from "react";
import styled from "styled-components";
import Spacer from "../Spacer";
import NavMenu from "../NavMenu";

const DisputeCard: React.FC = () => {    
    return (
        <>
            <Padding>
                <Card>
                    <CardTopRow>
                        <span className="f4 b">#711</span>
                        <Spacer/>
                        <span>Humanity Court</span>
                    </CardTopRow>
                    <CardBottomRow>
                        <PeriodContainer>
                            Evidence Period
                        </PeriodContainer>
                        <Spacer/>
                        <div className="tr">
                            <div>
                                Next period in:
                            </div>
                            <div>
                                3 Days
                            </div>
                        </div>
                    </CardBottomRow>
                    <div>
                        
                    </div>
                    <div>
                        
                    </div>
                </Card>
            </Padding>   
        </>
    );
};

const Padding = styled.div.attrs({
    className: 'dib w-50 w-third-gt-xs ph3 pb4'
})`

`;

const Card = styled.div.attrs({
    className: 'dib br3 w-100 pa3 bg-white pointer'
})`
    -webkit-box-shadow: 1px 3px 8px 1px rgba(0,0,0,0.2); 
    box-shadow: 1px 3px 8px 1px rgba(0,0,0,0.15);

    background-image:
        radial-gradient(at top right, rgb(242,227,255), transparent),
        radial-gradient(at bottom left, rgb(242,227,255), transparent);
`;

const CardTopRow = styled.div.attrs({
    className: 'db w-100 flex nowrap'
})``;

const CardBottomRow = styled.div.attrs({
    className: 'db w-100 flex nowrap items-end mt4'
})``;

const PeriodContainer = styled.div.attrs({
    className: 'di bg-green white pv2 ph3 br4 b'
})`
    position: relative
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