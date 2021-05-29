import React from "react";
import styled from "styled-components";
import { DisputeRound } from "../../types/DisputeRound";

interface RoundCardProps {
    round: DisputeRound,
    optionTitles?: string[]
}

const RoundCard: React.FC<RoundCardProps> = ({ round, optionTitles = [] }) => {
    const roundNumber = Number(round.round) + 1;
    const votes = round.votes ?? [];
    const voteCount: Map<number, number> = new Map();
    let abstainVoteCount: number = 0;
    let refuseToVoteCount: number;

    let allOptionTitles = [...optionTitles]
    allOptionTitles.unshift("Refuse to Arbitrate"); //temp

    // TODO: handle first to tied win
    votes.forEach((vote) => {
        if (vote.voted) {
            const choice = Number(vote.choice);
            const count = (voteCount.get(choice) ?? 0) + 1
            voteCount.set(choice, count);
        } else {
            abstainVoteCount++;
        }
    })

    refuseToVoteCount = voteCount.get(0) ?? 0;
    
    let winningOption = 0;
    voteCount.forEach((count, index) => {
        if (count > (voteCount.get(winningOption) ?? 0)) {
            winningOption = index;
        }
    })

    let winningOptionTitle: string = "";
    if (winningOption === 0 && refuseToVoteCount === 0) {
        winningOptionTitle = "Pending"
    } else {
        winningOptionTitle = allOptionTitles[winningOption];
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
                            { voteCount.get(index) ?? "0" }
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
                        <span>Abstain</span>
                    </td>
                    <td className="tc b">
                        {abstainVoteCount}
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