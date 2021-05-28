import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Spacer from "../Spacer";
import useCourtPolicy from "../../hooks/useCourtPolicy";
import { Court } from "../../types/Court";
import { getCourtFullName } from "../../utils/kleros-helpers/court";

interface CourtCardProp {
    court?: Court,
}

const CourtCard: React.FC<CourtCardProp> = ({ court }) => {
    const { subcourtToPolicy } = useCourtPolicy();
    const [ courtName, setCourtName ] = useState<string>("");

    useEffect(() => {
        if (court && subcourtToPolicy.has(court.id)) {
            const subcourtPolicy = subcourtToPolicy.get(court.id);

            let name = getCourtFullName(subcourtPolicy?.name ?? "");
            setCourtName(name);
        }
    }, [court, subcourtToPolicy]);

    // useEffect(() => {
    //     if (dispute) {
    //         const duration = getTimeUntilNextPeriod(dispute);
    //         setTimeUntilNextPeriod(duration);
    //     }
    // }, [dispute]);
    
    return (
        <>
            <Padding>
                <Card>
                    <CardTopRow>
                        <span className="f4 b">{courtName}</span>
                        {/* <Spacer/> */}
                        {/* <span>{courtName}</span> */}
                    </CardTopRow>
                    <CardBottomRow>
                        {/* <PeriodContainer period={dispute?.period} ruled={dispute?.ruled}/> */}
                        <Spacer/>
                        <span>Disputes: {court?.disputeCount}</span>
                        {/* <div className="tr">
                            <div>
                                Next period in:
                            </div>
                            <TimeDisplay duration={timeUntilNextPeriod}/>
                        </div> */}
                    </CardBottomRow>
                    <CardBottomRowMobile>
                        {/* <div className="tc mt4">
                            <PeriodContainer period={dispute?.period} ruled={dispute?.ruled}/>
                        </div> */}
                        {/* <div className="tc pt4">
                            <div>
                                Next period in:
                            </div>
                            <TimeDisplay duration={timeUntilNextPeriod}/>
                        </div> */}
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
    className: 'db w-100 flex wrap'
})`
    height: 2rem;
`;

const CardBottomRow = styled.div.attrs({
    className: 'dn flex-gt-xs w-100 nowrap items-end mt3'
})``;

const CardBottomRowMobile = styled.div.attrs({
    className: 'flex-column dn-gt-xs mt3 items-center'
})``;

export default CourtCard;