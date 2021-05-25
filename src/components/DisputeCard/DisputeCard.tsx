import React from "react";
import styled from "styled-components";
import Spacer from "../Spacer";
import { Dispute } from "../../types/Dispute";
import useCourts from "../../hooks/useCourts";
import PeriodContainer from "../PeriodContainer";
import TimeDisplay from "../TimeDisplay";

interface DisputeCardProp {
    dispute?: Dispute,
}

const DisputeCard: React.FC<DisputeCardProp> = ({ dispute }) => {
    const { subcourtToPolicy } = useCourts();
    let courtName: string = "";

    if (dispute && dispute.subcourt && subcourtToPolicy.has(dispute.subcourt.id)) {
        courtName = subcourtToPolicy.get(dispute.subcourt.id)?.name ?? "";
        if (courtName.length > 0 && !courtName.toLowerCase().includes("court")) {
            courtName = courtName + " Court";
        }
    }
    
    return (
        <>
            <Padding>
                <Card>
                    <CardTopRow>
                        <span className="f4 b">#{dispute?.id}</span>
                        <Spacer/>
                        <span>{courtName}</span>
                    </CardTopRow>
                    <CardBottomRow>
                        <PeriodContainer period={dispute?.period} ruled={dispute?.ruled}/>
                        <Spacer/>
                        <div className="tr">
                            <div>
                                Next period in:
                            </div>
                            <TimeDisplay duration="3 days"/>
                        </div>
                    </CardBottomRow>
                    <CardBottomRowMobile>
                        <div className="tc mt4">
                            <PeriodContainer period={dispute?.period} ruled={dispute?.ruled}/>
                        </div>
                        <div className="tc pt4">
                            <div>
                                Next period in:
                            </div>
                            <TimeDisplay duration="3 days"/>
                        </div>
                    </CardBottomRowMobile>
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
    className: 'db w-100 flex nowrap'
})``;

const CardBottomRow = styled.div.attrs({
    className: 'dn flex-gt-xs w-100 nowrap items-end mt4'
})``;

const CardBottomRowMobile = styled.div.attrs({
    className: 'flex-column dn-gt-xs mt3 items-center'
})``;

export default DisputeCard;