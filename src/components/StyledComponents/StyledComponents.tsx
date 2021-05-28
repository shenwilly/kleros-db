import { Link } from "react-router-dom";
import styled from "styled-components";

export const PageTitle = styled.div.attrs({
    className: 'f4'
})``;

export const PageSubTitle = styled.div.attrs({
    className: 'mv3'
})``;

export const StyledLink = styled(Link).attrs({
    className: 'no-underline'
})`
    color: ${props => props.theme.textColor}
`;