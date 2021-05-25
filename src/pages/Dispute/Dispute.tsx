import React from "react";
import styled from "styled-components";
import Page from "../../components/Page";
import { useQuery, gql } from '@apollo/client';
import { Dispute } from "../../types/Dispute";
import PeriodContainer from "../../components/PeriodContainer";
import TimeDisplay from "../../components/TimeDisplay";
import { ImFileText2 } from "react-icons/im";
import { useParams } from "react-router-dom";
import useCourts from "../../hooks/useCourts";
  
interface DisputePageParams {
    disputeID: string
}

const DisputePage: React.FC = () => {
    let { disputeID } = useParams<DisputePageParams>();
    const { subcourtToPolicy } = useCourts();
    const { loading, error, data } = useQuery<DisputeGQLResult>(
        DISPUTE_GQL,
        { variables: { disputeID: disputeID } }
    );
    const dispute = data?.dispute;
    
    let courtName: string = "";
    if (dispute && dispute.subcourt && subcourtToPolicy.has(dispute.subcourt.id)) {
        courtName = subcourtToPolicy.get(dispute.subcourt.id)?.name ?? "";
        if (courtName.length > 0 && !courtName.toLowerCase().includes("court")) {
            courtName = courtName + " Court";
        }
    }
    
    return (
        <Page>
            <Card>
                <Title>Dispute #{disputeID} - {courtName}</Title>
                
                <SubTitle>Proof of Humanity Registration Request</SubTitle>
                <span>A request to register the specified entry to a list of provable humans.</span>
                
                <SubTitle>Question:</SubTitle>
                <span>Should the request to register be accepted?</span>
                
                <SubTitle>Choices:</SubTitle>
                <span>Yes / No</span>

                <SubTitle>Answer:</SubTitle>
                <span>Yes</span>

                <SubTitle>Dispute Status:</SubTitle>
                <span>Final</span>

                <SubTitle>Primary Document:</SubTitle>
                <Circle>
                    <CircleText><ImFileText2 className="f4" /></CircleText>
                </Circle>

                <FloatBoxTopRight>
                    <PeriodContainer period="Execution"/>
                    <div className="tr mt3">
                        <div>Next period in:</div>
                        <TimeDisplay duration="3 days"/>
                    </div>
                </FloatBoxTopRight>

                <FloatBoxBottomRight>
                    <div className="tr mb2">Check case on:</div>
                    <div className="tr mb2">
                        <a className="b" href={`https://court.kleros.io/cases/${disputeID}`} target="blank">Court</a>
                    </div>
                    <div className="tr mb2">
                        <a className="b" href={`http://klerosboard.com/dispute/?id=${disputeID}`} target="blank">KlerosBoard</a>
                    </div>
                    <div className="tr mb2">
                        <a className="b" href={`https://klerosexplorer.com/case/${disputeID}`} target="blank">KlerosExplorer</a>
                    </div>
                </FloatBoxBottomRight>
            </Card>
        </Page>
    );
};

interface DisputeGQLResult {
    dispute: Dispute
}

const DISPUTE_GQL = gql`
    query getDispute($disputeID: String!) {
        dispute(id: $disputeID) {
            id
            disputeID
            subcourt {
                id
            }
            period
            ruled
        }
    }
`;

const Card = styled.div.attrs({
    className: 'db br3 w-100 pa3 bg-white'
})`
    -webkit-box-shadow: 1px 5px 10px 2px rgba(0,0,0,0.2); 
    box-shadow: 1px 5px 10px 2px rgba(0,0,0,0.15);

    position: relative;

    background-image:
        radial-gradient(at top right, rgb(242,227,255), transparent),
        radial-gradient(at bottom left, rgb(242,227,255), transparent);
`;

const Title = styled.div.attrs({
    className: 'b f4'
})``;

const SubTitle = styled.div.attrs({
    className: 'mt3 mb2 f4'
})``;

const FloatBoxTopRight = styled.div.attrs({
    className: 'absolute top-1 right-1 mt2'
})``;

const FloatBoxBottomRight = styled.div.attrs({
    className: 'absolute bottom-1 right-1'
})``;

const Circle = styled.div.attrs({
    className: 'flex pointer'
})`
    width: 50px;
    height: 50px;
    background-color: ${props => props.theme.purplePrimary};
    border-radius: 50%;
`;

const CircleText = styled.div`
    margin: auto;
    color: white;
`;

export default DisputePage;
