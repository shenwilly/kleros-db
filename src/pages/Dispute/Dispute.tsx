import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Page from "../../components/Page";
import { useQuery, gql } from '@apollo/client';
import { Dispute } from "../../types/Dispute";
import PeriodContainer from "../../components/PeriodContainer";
import TimeDisplay from "../../components/TimeDisplay";
import { useParams } from "react-router-dom";
import useCourts from "../../hooks/useCourts";
import Archon from "@kleros/archon";
import { MetaEvidenceJSON } from "../../types/MetaEvidence";
import { KLEROS_COURT_ADDRESS, INFURA_ENDPOINT } from "../../utils/constants/address";
import { getTimeUntilNextPeriod } from "../../utils/kleros-helpers/period";
import EvidenceDisplay from "../../components/EvidenceDisplay";
import Spinner from "../../components/Spinner";

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
    const [ metaEvidence, setMetaEvidence ] = useState<MetaEvidenceJSON>({} as MetaEvidenceJSON);
    const [ courtName, setCourtName ] = useState<string>("");
    const [ ruling, setRuling ] = useState<string>("");
    const [ timeUntilNextPeriod, setTimeUntilNextPeriod ] = useState(0);
    const [ courtMetadataURI, setCourtMetadataURI ] = useState<string>("");
    const [ appPolicyURI, setAppPolicyURI ] = useState<string>("");
    const [ evidenceDisplayInterfaceURI, setEvidenceDisplayInterfaceURI ] = useState<string>("");
    
    useEffect(() => {
        if (dispute) {
            setEvidenceLoading(true);
            var archon = new Archon(INFURA_ENDPOINT);

            // fetch metaevidence
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
                    const result: MetaEvidenceJSON = metaEvidenceData.metaEvidenceJSON
                    setMetaEvidence(result)

                    if (result.fileURI && result.fileURI.length > 0) {
                        setAppPolicyURI("https://ipfs.kleros.io" + result.fileURI) //temp
                    }

                    if (result.evidenceDisplayInterfaceURI && result.evidenceDisplayInterfaceURI.length > 0) {
                        let interfaceURL = result.evidenceDisplayInterfaceURI
                        if (!interfaceURL.includes("http")) {
                            interfaceURL = "https://ipfs.kleros.io" + interfaceURL;
                        }
                        setEvidenceDisplayInterfaceURI(interfaceURL) //temp
                    }
                    
                    // console.log(result)
                    setEvidenceLoading(false);
                })
            })
        };
    }, [dispute]);

    useEffect(() => {
        if (dispute) {
            const duration = getTimeUntilNextPeriod(dispute);
            setTimeUntilNextPeriod(duration);

            if (dispute.subcourt && subcourtToPolicy.has(dispute.subcourt.id)) {
                const subcourtPolicy = subcourtToPolicy.get(dispute.subcourt.id);
                setCourtMetadataURI(subcourtPolicy?.uri ?? "");

                let name = subcourtPolicy?.name ?? "";
                if (name.length > 0 && !name.toLowerCase().includes("court")) {
                    name = name + " Court";
                }
                setCourtName(name);
            }
        }
    }, [dispute, subcourtToPolicy]);

    useEffect(() => {
        if (!dispute || !metaEvidence) {
            setRuling("-");
            return;
        }

        const rulingOptionTitles = metaEvidence.rulingOptions?.titles;
        if (!rulingOptionTitles || rulingOptionTitles?.length === 0) {
            setRuling("-");
            return;
        };

        if (dispute.ruled === true) {
            // temp
            var archon = new Archon(INFURA_ENDPOINT);
            archon.arbitrable.getRuling(
                dispute.arbitrable?.id, KLEROS_COURT_ADDRESS, dispute.id
            ).then((rulingResponse: any) => {
                const ruling = Number(rulingResponse.ruling) - 1;
                console.log(ruling, "!?");
                setRuling(rulingOptionTitles[ruling]); //TODO
            });
        }
    }, [dispute, metaEvidence]);

    if (loading || evidenceLoading)
        return (
            <LoadingScreen>
                <Spinner/>
            </LoadingScreen>
        )

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
                </StyledList>

                {evidenceDisplayInterfaceURI.length > 0 && dispute &&
                    <>
                        <SubTitle>App Display:</SubTitle>
                        <div className="w-80">
                            <EvidenceDisplay
                                uri={`${evidenceDisplayInterfaceURI.replace(
                                    /^\/ipfs\//,
                                    'https://ipfs.kleros.io/ipfs/'
                                )}?${encodeURIComponent(
                                    JSON.stringify({
                                    arbitrableContractAddress: dispute?.arbitrable?.id,
                                    arbitratorContractAddress: KLEROS_COURT_ADDRESS,
                                    disputeID: dispute?.id
                                    })
                                )}`}
                                height={metaEvidence.evidenceDisplayHeight || '215px'}
                            />
                        </div>
                    </>}

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
                    <PeriodContainer period={dispute?.period} ruled={dispute?.ruled}/>
                    <div className="tr mt3">
                        <div>Next period in:</div>
                        <TimeDisplay duration={timeUntilNextPeriod}/>
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
                timesPerPeriod
            }
            arbitrable {
                id
            }
            lastPeriodChange
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
    className: 'absolute top-1 right-1 mt2 tr'
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
