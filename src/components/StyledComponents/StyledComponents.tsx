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

export const StyledButton = styled.a.attrs({
    className: 'f5 link dim pa3 dib white pointer mh2 br3 tc b mv2 mv0-gt-xs'
})`
    min-width: 150px;

    background-image: linear-gradient(to right, rgb(190,115,240) 0%, rgb(155, 35, 250) 75%);
`