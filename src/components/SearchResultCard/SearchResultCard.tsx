import React from "react";
import styled from "styled-components";

interface SearchResultCardProps {
    title?: string,
    subtitle?: string,
    onClick: React.MouseEventHandler
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ title, subtitle, onClick }) => {
    
    return (
        <div onClick={onClick}>
            <StyledCard>
                <div>{title}</div>
                <div className="f6">{subtitle}</div>
            </StyledCard>
        </div>
    );
};

const StyledCard = styled.div.attrs({
    className: 'db items-between ph2 pv2 br2 pointer'
})`
    :hover, :focus{
        background-color: ${props => props.theme.purpleLighter}
    }
`;

export default SearchResultCard;