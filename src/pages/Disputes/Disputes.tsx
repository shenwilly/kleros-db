import React from "react";
import styled from "styled-components";
import Page from "../../components/Page";

const Home: React.FC = () => {
    
    return (
    <Page>
        <Title>Disputes</Title>
        <SearchInput placeholder="Search Dispute by ID  🔍" type="input"/>
        <div className="mt2 mb3">
            <StatLabel>ETH Price: $2,073</StatLabel>
            <StatLabel>Transactions (24H): 164,728</StatLabel>
            <StatLabel>Pairs: 32,408</StatLabel>
            <StatLabel>Fees (24H): $3,184,943</StatLabel>
        </div>

        <SubTitle>
            Top Tokens
        </SubTitle>

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

const Title = styled.div.attrs({
    className: 'f4'
})``;

const SubTitle = styled.div.attrs({
    className: 'f5 mt4 mb2'
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

export default Home;
