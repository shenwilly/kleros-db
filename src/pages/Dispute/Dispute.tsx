import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Page from "../../components/Page";
import { useQuery, gql } from '@apollo/client';
import { Dispute } from "../../types/Dispute";
import PeriodContainer from "../../components/PeriodContainer";
import TimeDisplay from "../../components/TimeDisplay";
import { useParams } from "react-router-dom";
import useCourtPolicy from "../../hooks/useCourtPolicy";
import { MetaEvidenceJSON } from "../../types/MetaEvidence";
import { KLEROS_COURT_ADDRESS } from "../../utils/constants/address";
import { getTimeUntilNextPeriod } from "../../utils/kleros-helpers/period";
import EvidenceDisplay from "../../components/EvidenceDisplay";
import Spinner from "../../components/Spinner";
import { getDisputeEventLog, getMetaEvidenceEventLog, getIpfsFullURI, getRulingEventLog } from "../../utils/kleros-helpers/archon";
import { DisputeRound } from "../../types/DisputeRound";
import RoundCard from "../../components/RoundCard";
import { PolicyData } from "../../types/Policy";
import useArbitrable from "../../hooks/useArbitrable";

interface DisputePageParams {
    disputeID: string
}

const DisputePage: React.FC = () => {
    let { disputeID } = useParams<DisputePageParams>();
    const { getCourtPolicy, getCourtName } = useCourtPolicy();
    const { getArbitrableSubmissionURI } = useArbitrable();
    const { loading, data } = useQuery<DisputeGQLResult>(
        DISPUTE_GQL,
        { variables: { disputeID: disputeID } }
    );
    const dispute = data?.dispute;

    const [ evidenceLoading, setEvidenceLoading ] = useState<boolean>(true);
    const [ metaEvidence, setMetaEvidence ] = useState<MetaEvidenceJSON>({} as MetaEvidenceJSON);
    const [ courtPolicy, setCourtPolicy ] = useState<PolicyData>();
    const [ courtName, setCourtName ] = useState<string>("");
    const [ ruling, setRuling ] = useState<string>("");
    const [ timeUntilNextPeriod, setTimeUntilNextPeriod ] = useState(0);
    const [ appPolicyURI, setAppPolicyURI ] = useState<string>("");
    const [ evidenceDisplayInterfaceURI, setEvidenceDisplayInterfaceURI ] = useState<string>("");
    const [ appSubmissionURI, setAppSubmissionURI ] = useState<string>("");
    const [ rounds, setRounds ] = useState<DisputeRound[]>([]);
    
    useEffect(() => {
        const fetchMetaEvidence = async () => {
            const arbitrable = dispute?.arbitrable?.id;
            const disputeEventLog = await getDisputeEventLog(dispute?.id!, arbitrable!);
            const metaEvidenceEventLog = await getMetaEvidenceEventLog(disputeEventLog.metaEvidenceID, arbitrable!);

            const metaEvidenceJSON = metaEvidenceEventLog.metaEvidenceJSON

            setMetaEvidence(metaEvidenceJSON)

            if (metaEvidenceJSON.fileURI && metaEvidenceJSON.fileURI.length > 0) {
                setAppPolicyURI(getIpfsFullURI(metaEvidenceJSON.fileURI))
            }

            if (metaEvidenceJSON.evidenceDisplayInterfaceURI && metaEvidenceJSON.evidenceDisplayInterfaceURI.length > 0) {
                setEvidenceDisplayInterfaceURI(getIpfsFullURI(metaEvidenceJSON.evidenceDisplayInterfaceURI))
            }
            
            setEvidenceLoading(false);
        };

        if (dispute) {
            setEvidenceLoading(true);
            fetchMetaEvidence();
        };
    }, [dispute]);

    useEffect(() => {
        const fetchArbitrableSubmissionURI = async () => {
            let submissionURI = await getArbitrableSubmissionURI(dispute?.id!, dispute?.arbitrable?.id!);
            setAppSubmissionURI(submissionURI)
        }

        if (dispute && dispute?.arbitrable) {
            fetchArbitrableSubmissionURI();
        }
    }, [dispute, getArbitrableSubmissionURI]);

    useEffect(() => {
        if (dispute && dispute.subcourt) {
            let policy = getCourtPolicy(dispute.subcourt.id);
            if (policy) {
                setCourtPolicy(policy);

                let name = getCourtName(dispute.subcourt.id);
                setCourtName(name)
            }
        }
    }, [dispute, getCourtPolicy, getCourtName]);
    

    useEffect(() => {
        const fetchRuling = async (dispute: Dispute, optionTitles: string[]) => {
            const rulingEventLog = await getRulingEventLog(dispute.id, dispute.arbitrable?.id!)
            const ruling = Number(rulingEventLog.ruling);

            // temp: add option 0 refuse to
            let options = [...optionTitles]
            options.unshift("Refuse to Arbitrate");

            setRuling(options[ruling]);
        }

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
            fetchRuling(dispute, rulingOptionTitles);
        }
    }, [dispute, metaEvidence]);

    useEffect(() => {
        if (dispute) {
            let disputeRounds = dispute.rounds ?? [];
            disputeRounds?.slice().sort((a, b) => Number(a.round) - Number(b.round));
            setRounds(disputeRounds)

            const duration = getTimeUntilNextPeriod(dispute);
            setTimeUntilNextPeriod(duration);
        }
    }, [dispute]);

    // if (loading || evidenceLoading)
    if (loading)
        return (
            <LoadingScreen>
                <Spinner/>
            </LoadingScreen>
        )

    return (
        <Page>
            <Card>
                <Title>Dispute #{disputeID} - {courtName}</Title>

                <FloatBoxTopRight>
                    <PeriodContainer period={dispute?.period} ruled={dispute?.ruled}/>
                    <div className="tc tr-gt-xs mt3">
                        <div>Next period in:</div>
                        <TimeDisplay duration={timeUntilNextPeriod}/>
                    </div>
                </FloatBoxTopRight>
                
                <DisputeDetailContainer>
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

                    {evidenceLoading && 
                        <GlassLoadingScreen>
                            <Spinner />
                        </GlassLoadingScreen>}
                </DisputeDetailContainer>

                <SubTitle>Documents:</SubTitle>
                <div className="w-100 relative">
                    <StyledList>
                        { appPolicyURI.length > 0 && 
                            <li><a href={appPolicyURI} target="blank">App Policy</a></li>}
                        { courtPolicy && courtPolicy?.uri?.length > 0 && 
                            <li><a href={courtPolicy?.uri} target="blank">Court Metadata</a></li>}
                        { appSubmissionURI.length > 0 && 
                            <li><a href={appSubmissionURI} target="blank">App Submission</a></li>}
                    </StyledList>

                    <FloatBoxBottomRight>
                        <div className="tr-gt-xs mb2">Check case on:</div>
                        <div className="tr-gt-xs mb2">
                            <a className="b" href={`https://court.kleros.io/cases/${disputeID}`} target="blank">Court</a>
                        </div>
                        <div className="tr-gt-xs mb2">
                            <a className="b" href={`http://klerosboard.com/dispute/?id=${disputeID}`} target="blank">KlerosBoard</a>
                        </div>
                        <div className="tr-gt-xs mb2">
                            <a className="b" href={`https://klerosexplorer.com/case/${disputeID}`} target="blank">KlerosExplorer</a>
                        </div>
                    </FloatBoxBottomRight>
                </div>

                {evidenceDisplayInterfaceURI.length > 0 && dispute &&
                    <>
                        <SubTitle>App Display:</SubTitle>
                        <div className="w-100">
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
            </Card>
            <Card>
                <div className="f4 mb3">
                    Dispute Rounds
                </div>
                    { metaEvidence && rounds.map((round) => {
                        return <RoundCard key={round.id} round={round} optionTitles={metaEvidence.rulingOptions?.titles}/>
                    })}
            </Card>
            {/* <Card>
                Evidences (Under construction)
            </Card> */}
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
                hiddenVotes
            }
            arbitrable {
                id
            }
            lastPeriodChange
            period
            ruled
            rounds {
                id
                round
                voteCount
                votes {
                    id
                    juror {
                        id
                    }
                    voted
                    commit
                    choice
                }
                winningChoice
                tied
                castedVoteCounts
            }
        }
    }
`;

const Card = styled.div.attrs({
    className: 'db br3 w-100 pa3 bg-white mb3'
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
    className: 'relative absolute-gt-xs top-0 top-1-gt-xs right-0 right-1-gt-xs mt0 mt2-gt-xs tc tr-gt-xs mv3 mb0-gt-xs'
})``;

const FloatBoxBottomRight = styled.div.attrs({
    className: 'relative absolute-gt-xs right-0 right-1-gt-xs mb4 mb0-gt-xs'
})`
    bottom: -20px;
`;

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
    className: "db w-100"
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

const DisputeDetailContainer = styled.div.attrs({
    className: "w-80 relative"
})``

const GlassLoadingScreen = styled.div.attrs({
    className: "absolute w-100 h-100 top-0 left-0 br3 flex items-center justify-center"
})`
    background-color: rgb(202,150,255,0.15);
    backdrop-filter: blur(5px);
`

export default DisputePage;
