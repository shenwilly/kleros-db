import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Page from "../../components/Page";
import { useQuery, gql } from '@apollo/client';
import { useParams } from "react-router-dom";
import useCourtPolicy from "../../hooks/useCourtPolicy";
import Spinner from "../../components/Spinner";
import { getCourtFullName } from "../../utils/kleros-helpers/court";
import { Court } from "../../types/Court";
import { StyledButton } from "../../components/StyledComponents/StyledComponents";
import { ethers } from "ethers";

interface CourtPageParams {
    subcourtID: string
}

const CourtPage: React.FC = () => {
    let { subcourtID } = useParams<CourtPageParams>();
    const { subcourtToPolicy } = useCourtPolicy();
    const { loading, data } = useQuery<CourtGQLResult>(
        COURT_GQL,
        { variables: { subcourtID: subcourtID } }
    );
    const [ courtName, setCourtName ] = useState<string>("");
    const [ courtMetadataURI, setCourtMetadataURI ] = useState<string>("");

    const court = data?.court!;
    console.log(court);

    useEffect(() => {
        if (court && subcourtToPolicy.has(court.id)) {
            const subcourtPolicy = subcourtToPolicy.get(court.id);
            setCourtMetadataURI(subcourtPolicy?.uri ?? "");

            let name = getCourtFullName(subcourtPolicy?.name ?? "");
            setCourtName(name);
        }
    }, [court, subcourtToPolicy]);

    if (loading)
        return (
            <LoadingScreen>
                <Spinner/>
            </LoadingScreen>
        )
        
    return (
        <Page>
            <Card>
                <Title>#{subcourtID} - {courtName}</Title>

                <SubTitle>Parent Court:</SubTitle>
                <Paragraph>
                    -
                </Paragraph>

                <SubTitle>Subcourts:</SubTitle>
                <Paragraph>
                    -
                </Paragraph>

                <Grid>
                    <GridElement>
                        <SubTitle>Dispute Count:</SubTitle>
                        <Paragraph>
                            {court.disputeCount}
                        </Paragraph>
                    </GridElement>
                    <GridElement>
                        <SubTitle>Private Votes:</SubTitle>
                        <Paragraph>
                            {court.hiddenVotes == true ? 'Yes' : 'No'}
                        </Paragraph>
                    </GridElement>
                    <GridElement>
                        <SubTitle>Alpha:</SubTitle>
                        <Paragraph>
                            {court.alpha}
                        </Paragraph>
                    </GridElement>
                    <GridElement>
                        <SubTitle>Minimal PNK Stake:</SubTitle>
                        <Paragraph>
                            {ethers.utils.formatUnits(court.minStake, 18)} PNK
                        </Paragraph>
                    </GridElement>
                    <GridElement>
                        <SubTitle>Juror Reward:</SubTitle>
                        <Paragraph>
                            {ethers.utils.formatUnits(court.feeForJuror, 18)} ETH
                        </Paragraph>
                    </GridElement>
                    <GridElement>
                        <SubTitle>Jurors for Court Jump:</SubTitle>
                        <Paragraph>
                            {court.jurorsForCourtJump}
                        </Paragraph>
                    </GridElement>
                </Grid>

                <SubTitle>Documents:</SubTitle>
                <Paragraph>
                    <a href={courtMetadataURI} target="blank">Court Metadata</a>
                </Paragraph>

                <FloatBoxTopRight>
                    <StyledButton href="http://klerosboard.com/odds/" target="blank">Check Juror Odds</StyledButton>
                    <StyledButton href="https://court.kleros.io/courts" target="blank">Stake</StyledButton>
                </FloatBoxTopRight>

                <FloatBoxBottomRight>
                    <div className="tr mb2">Check court on:</div>
                    <div className="tr mb2">
                        <a className="b" href={`http://klerosboard.com/court/?id=${subcourtID}`} target="blank">KlerosBoard</a>
                    </div>
                </FloatBoxBottomRight>
            </Card>
        </Page>
    );
};

interface CourtGQLResult {
    court: Court
}

const COURT_GQL = gql`
    query getCourt($subcourtID: String!) {
        court(id: $subcourtID) {
            id
            parent {
                id
            }
            hiddenVotes
            minStake
            alpha
            feeForJuror
            jurorsForCourtJump
            timesPerPeriod
            children {
                id
            }
            disputeCount
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

const Paragraph = styled.div.attrs({
    className: "db w-100"
})``

const LoadingScreen = styled.div.attrs({
    className: "w-100 h-100 flex items-center justify-center"
})`
    height: 70vh;
`

const FloatBoxTopRight = styled.div.attrs({
    className: 'absolute top-1 right-1 mt2 tr'
})``;

const FloatBoxBottomRight = styled.div.attrs({
    className: 'absolute right-1 bottom-1'
})``;

const Grid = styled.div.attrs({
    className: 'db w-100'
})``

const GridElement = styled.div.attrs({
    className: 'dib w-100 w-50-sm w-third-gt-sm'
})``

export default CourtPage;
