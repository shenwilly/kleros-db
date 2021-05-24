import React from "react";
import styled from "styled-components";
import Page from "../../components/Page";
import { useQuery, gql } from '@apollo/client';
import { Dispute } from "../../types/Dispute";
import PeriodContainer from "../../components/PeriodContainer";
import TimeDisplay from "../../components/TimeDisplay";
import { ImFileText2 } from "react-icons/im";

const LATEST_DISPUTES_GQL = gql`
    query latestDisputes {
        disputes(first: 9, orderBy: disputeID, orderDirection: desc) {
            id
            disputeID
            subcourt {
                id
                children
            }
            period
            ruled
        }
    }
`;

type Disputes = {
    disputes: Dispute[];
}
  
const DisputePage: React.FC = () => {
    let dispute = {
        id: "761"
    }
    // const { loading, error, data } = useQuery<Disputes>(LATEST_DISPUTES_GQL);
    
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error :(</p>;
    
    // const disputes = data?.disputes ?? [];
    // console.log(disputes);
    
    return (
        <Page>
            <Card>
                <Title>Dispute #761 - Humanity Court</Title>
                
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
                        <a className="b" href={`https://court.kleros.io/cases/${dispute.id}`} target="blank">Court</a>
                    </div>
                    <div className="tr mb2">
                        <a className="b" href={`http://klerosboard.com/dispute/?id=${dispute.id}`} target="blank">KlerosBoard</a>
                    </div>
                    <div className="tr mb2">
                        <a className="b" href={`https://klerosexplorer.com/case/${dispute.id}`} target="blank">KlerosExplorer</a>
                    </div>
                </FloatBoxBottomRight>
            </Card>
        </Page>
    );
};

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
