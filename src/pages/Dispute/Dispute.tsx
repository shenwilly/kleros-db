import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Page from "../../components/Page";
import { useQuery, gql } from '@apollo/client';
import { Dispute } from "../../types/Dispute";
import PeriodContainer from "../../components/PeriodContainer";
import TimeDisplay from "../../components/TimeDisplay";
// import { ImFileText2 } from "react-icons/im";
import { CgNpm, CgSpinner } from "react-icons/cg";
import { useParams } from "react-router-dom";
import useCourts from "../../hooks/useCourts";
import Archon from "@kleros/archon";
import { MetaEvidence } from "../../types/MetaEvidence";
import { KLEROS_COURT_ADDRESS, INFURA_ENDPOINT } from "../../utils/constants/address";

interface DisputePageParams {
    disputeID: string
}

const DisputePage: React.FC = () => {
    let { disputeID } = useParams<DisputePageParams>();
    const { subcourtToPolicy } = useCourts();
    const { loading, data } = useQuery<DisputeGQLResult>(
        DISPUTE_GQL,
        { variables: { disputeID: disputeID } }
    );
    const dispute = data?.dispute;

    const [ evidenceLoading, setEvidenceLoading ] = useState<boolean>(true);
    const [ metaEvidence, setMetaEvidence ] = useState<MetaEvidence>({} as MetaEvidence);
    const [ courtName, setCourtName ] = useState<string>("");
    const [ ruling, setRuling ] = useState<string>("");
    const [ courtMetadataURI, setCourtMetadataURI ] = useState<string>("");
    const [ appPolicyURI, setAppPolicyURI ] = useState<string>("");
    const [ submissionURI, setSubmissionURI ] = useState<string>("");
    
    useEffect(() => {
        if (dispute) {
            setEvidenceLoading(true);
            var archon = new Archon(INFURA_ENDPOINT);
            // console.log(dispute)
            archon.arbitrable.getDispute(
                dispute.arbitrable?.id,
                KLEROS_COURT_ADDRESS,
                dispute.id,
            ).then((disputeLog: any) => {
                // console.table(disputeLog)
                archon.arbitrable.getMetaEvidence(
                    dispute.arbitrable?.id,
                    disputeLog.metaEvidenceID
                ).then((metaEvidenceData: any) => {
                    const result: MetaEvidence = metaEvidenceData.metaEvidenceJSON
                    setMetaEvidence(result)

                    if (result.fileURI && result.fileURI.length > 0) {
                        setAppPolicyURI("https://ipfs.kleros.io" + result.fileURI) //temp
                    }
                    
                    setEvidenceLoading(false);
                })
            })
        };
    }, [dispute]);

    useEffect(() => {
        if (dispute && dispute.subcourt && subcourtToPolicy.has(dispute.subcourt.id)) {
            const subcourtPolicy = subcourtToPolicy.get(dispute.subcourt.id);
            setCourtMetadataURI(subcourtPolicy?.uri ?? "");

            let name = subcourtPolicy?.name ?? "";
            if (name.length > 0 && !name.toLowerCase().includes("court")) {
                name = name + " Court";
            }
            setCourtName(name);
        }
    }, [dispute]);

    useEffect(() => {
        if (!dispute || !metaEvidence) {
            setRuling("-");
            return;
        }

        const rulingOptionTitles = metaEvidence.rulingOptions?.titles;
        if (!rulingOptionTitles || rulingOptionTitles?.length == 0) {
            setRuling("-");
            return;
        };

        setRuling(rulingOptionTitles[0]); //TODO
    }, [dispute, metaEvidence]);

    if (loading || evidenceLoading)
        return (
            <LoadingScreen>
                <CgSpinner className="f1 rotate-center"/>
            </LoadingScreen>
        )
    console.log(loading, evidenceLoading)

    return (
        <Page>
            <Card>
                <Title>Dispute #{disputeID} - {courtName}</Title>
                
                <SubTitle>{ metaEvidence?.title ||
                    "Registration Request"}
                </SubTitle>
                <Paragraph>
                    { metaEvidence?.description ||
                        "A request to register an entry to a curated list."}
                </Paragraph>
                
                <SubTitle>Question:</SubTitle>
                <Paragraph>{ metaEvidence?.question ||
                    "Should this request to register be accepted?"}
                </Paragraph>
                
                <SubTitle>Choices:</SubTitle>
                <StyledList>
                    { metaEvidence?.rulingOptions?.titles.map((value, index) => {
                        const title = value;
                        const description = metaEvidence?.rulingOptions?.descriptions[index] ?? "";
                        return <li key={index}>{title}{ description.length > 0 ? ` - ${description}` : '' }</li>;
                    })  
                    || (<>
                            <li>Yes</li>
                            <li>No</li>
                        </>)
                    }
                </StyledList>

                <SubTitle>Result:</SubTitle>
                <span>{ruling}</span>

                <SubTitle>Documents:</SubTitle>
                <StyledList>
                    { appPolicyURI.length > 0 && 
                        <li><a href={appPolicyURI} target="blank">App Policy</a></li>}
                    <li><a href={courtMetadataURI} target="blank">Court Metadata</a></li>
                    { submissionURI.length > 0 &&
                        <li><a href={submissionURI} target="blank">Submission</a></li>}
                </StyledList>
                {/* <div className="flex">
                    <span className="mr2 tc">
                        <Circle>
                            <CircleText><ImFileText2 className="f4" /></CircleText>
                        </Circle>
                        <div className="mt1 f6">Policy</div>
                    </span>
                    <span className="mr2 tc">
                        <Circle>
                            <CircleText><ImFileText2 className="f4" /></CircleText>
                        </Circle>
                        <div className="mt1 f6">Submission</div>
                    </span>
                </div> */}

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
            arbitrable {
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

// const Circle = styled.div.attrs({
//     className: 'flex pointer'
// })`
//     width: 50px;
//     height: 50px;
//     background-color: ${props => props.theme.purplePrimary};
//     border-radius: 50%;
// `;

// const CircleText = styled.div`
//     margin: auto;
//     color: white;
// `;

const Paragraph = styled.div.attrs({
    className: "db w-80"
})``

const StyledList = styled.ul.attrs({

})`
    margin: 0;
    padding-inline-start: 25px;

    li {
        margin-bottom: 8px;
    }
`

const LoadingScreen = styled.div.attrs({
    className: "w-100 h-100 flex items-center justify-center"
})`
    height: 70vh;
`

export default DisputePage;
