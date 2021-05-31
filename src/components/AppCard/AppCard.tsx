import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BiLinkExternal } from "react-icons/bi";
import { ArbitrableData } from "../../types/Arbitrable";

interface AppCardProp {
    arbitrableData?: ArbitrableData,
}

const AppCard: React.FC<AppCardProp> = ({ arbitrableData }) => {

    const name = arbitrableData?.name ?? "";
    const logo = arbitrableData?.iconUri ?? "";

    return (
        <>
            <Padding>
                <Card>
                    <CardTopRow>
                        <span className="f4 b w-80">{name} <BiLinkExternal/></span>
                        {/* <Spacer /> */}
                        { logo.length > 0 &&
                            <img src={logo} alt="thegraph" className="dib" height="80px" width="80px" />}
                    </CardTopRow>
                    {/* <CardBottomRow>
                        <Spacer/>
                        <span>Disputes: 222</span>
                    </CardBottomRow> */}
                </Card>
            </Padding>   
        </>
    );
};

const Padding = styled.div.attrs({
    className: 'dib w-100 w-50-sm w-third-gt-sm ph3 pb4'
})``;

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
    className: 'db w-100 flex wrap'
})`
    // height: 2rem;
`;

const CardBottomRow = styled.div.attrs({
    className: 'flex w-100 nowrap items-end mt3'
})``;

export default AppCard;