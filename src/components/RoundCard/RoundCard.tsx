import React from "react";
import styled from "styled-components";
import { DisputeRound } from "../../types/DisputeRound";

interface RoundCardProps {
    round: DisputeRound,
    optionTitles?: string[]
}

const RoundCard: React.FC<RoundCardProps> = ({ round, optionTitles = ['Yes', 'No'] }) => {
    const roundNumber = Number(round.round) + 1;
    const winningChoice = Number(round.winningChoice!);

    const voteCount = Number(round.voteCount!);
    const castedVoteCounts = round.castedVoteCounts!;

    let votedCount = 0;
    castedVoteCounts.forEach((castedVoteCount) => {
        let count = Number(castedVoteCount);
        votedCount += count
    })
    let pendingVoteCount = voteCount - votedCount;
    let refuseToVoteCount = Number(castedVoteCounts[0]);
    

    let allOptionTitles = [...optionTitles]
    allOptionTitles.unshift("Refuse to Arbitrate"); 
    
    let winningOptionTitle: string = "";
    if (winningChoice === 0 && refuseToVoteCount === 0) {
        winningOptionTitle = "Pending"
    } else {
        winningOptionTitle = allOptionTitles[winningChoice];
    }
    
    return (
    <Card>
        <div className="flex justify-between">
            <span>Round #{roundNumber} - <span className="b">{winningOptionTitle}</span></span>
        </div>

        <br/>

        <StyledTable>
            <tbody>
                { allOptionTitles.map((option, index) => {
                    if (index === 0) return null;

                    return <tr key={index} className="ba">
                        <td className="bb">
                            <span>{option}</span>
                        </td>
                        <td className="tc b bb">
                            { castedVoteCounts[index] ?? "0" }
                        </td>
                    </tr>
                })}
                {refuseToVoteCount > 0 && 
                    <tr>
                        <td className="bb">
                            <span>Refuse to Arbitrate</span>
                        </td>
                        <td className="tc b bb">
                            {refuseToVoteCount}
                        </td>
                    </tr>}
                <tr>
                    <td>
                        <span>Pending</span>
                    </td>
                    <td className="tc b">
                        {pendingVoteCount}
                    </td>
                </tr>
            </tbody>
        </StyledTable>

    </Card>
    );
};

const Card = styled.div.attrs({
    className: 'db bg-white br3 w-100 pa3 mb4'
})`
    -webkit-box-shadow: 0 5px 6px 2px rgba(0,0,0,0.15); 
    box-shadow: 0 5px 6px 2px rgba(0,0,0,0.15);

    position: relative;
    border-color: ${props => props.theme.purpleLight};
`;

const StyledTable = styled.table.attrs({
    className: 'w-100 br3'
})`
    background-color: ${props => props.theme.purpleLighter};
    td {
        padding: 8px;
    }
`;

export default RoundCard;