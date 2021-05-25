import React from "react";
import styled from "styled-components";
import Page from "../../components/Page";
import DisputeCard from "../../components/DisputeCard";
import { useQuery, gql } from '@apollo/client';
import { Disputes } from "../../types/Dispute";
import { Link } from "react-router-dom";

const DisputesPage: React.FC = () => {
    const { loading, error, data } = useQuery<Disputes>(LATEST_DISPUTES_GQL);
    
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error :(</p>;
    
    const disputes = data?.disputes ?? [];
    console.log(disputes);
    
    return (
        <Page>
            <Title>Disputes</Title>
            <SubTitle>
                Latest Disputes
            </SubTitle>

            <DisputeGrid>
                {  
                    disputes.map((dispute) => (
                        <StyledLink to={`disputes/${dispute.id}`} key={dispute.id}>
                            <DisputeCard key={dispute.id} dispute={dispute}/>
                        </StyledLink>
                    ))
                }
            </DisputeGrid>

            <FullBox>
                {/* <table className="w-100 tr pa2">
                    <thead>
                        <tr>
                            <th className="tl w-30">Name</th>
                            <th>Liquidity</th>
                            <th>Volume (24hrs)</th>
                            <th>Volume (7d)</th>
                            <th>Fees (24hr)</th>
                            <th>1y Fees / Liquidity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="tl">Name</td>
                            <td>Liquidity</td>
                            <td>Volume (24hrs)</td>
                            <td>Volume (7d)</td>
                            <td>Fees (24hr)</td>
                            <td>1y Fees / Liquidity</td>
                        </tr>
                        <tr>
                            <td className="tl">Name</td>
                            <td>Liquidity</td>
                            <td>Volume (24hrs)</td>
                            <td>Volume (7d)</td>
                            <td>Fees (24hr)</td>
                            <td>1y Fees / Liquidity</td>
                        </tr>
                    </tbody>
                </table> */}
            </FullBox>
        </Page>
    );
};

const LATEST_DISPUTES_GQL = gql`
    query latestDisputes {
        disputes(first: 9, orderBy: disputeID, orderDirection: desc) {
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

const Title = styled.div.attrs({
    className: 'f4'
})``;

const SubTitle = styled.div.attrs({
    className: 'mv3'
})``;

const SearchInput = styled.input.attrs({
    className: 'mt3 mb3 w-100 pv3'
})`
    width: 100%;
    text-indent: 16px;
    border: none;
    border-radius: 8px;
    background-color: rgba(250, 250, 250, 0.7);
    -webkit-box-shadow: 0px 6px 17px 1px rgba(0,0,0,0.2); 
    box-shadow: 0px 6px 15px 1px rgba(0,0,0,0.15);

    :focus-visible {
        outline: none;
    }
`;

const StatLabel = styled.span.attrs({
    className: 'f5 mr3'
})``;

interface ClassNameProps {
    className?: string;
}

const HalfBox = styled.div.attrs<ClassNameProps>(props => ({
    className: `dib h-100 w-100 w-50-gt-xs ${props.className}`
}))`
    height: '80px';
    border-radius: 8px;
`;

const WhiteBox = styled.div.attrs<ClassNameProps>(props => ({
    className: `bg-white br4 h-100 ${props.className}`
}))``;

const FullBox = styled.div.attrs({
    className: 'dib w-100 bg-white'
})`
    border-radius: 8px;
`;

const DisputeGrid = styled.div.attrs({
    className: 'db w-100'
})``;

const StyledLink = styled(Link).attrs({
    className: 'no-underline'
})`
    color: ${props => props.theme.textColor}
`;

export default DisputesPage;
