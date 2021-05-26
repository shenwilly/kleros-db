import React, {useState} from "react";
import styled from "styled-components";
import Spinner from "../Spinner";

interface EvidenceDisplayProps {
    uri: string,
    height: string
}

const EvidenceDisplay: React.FC<EvidenceDisplayProps> = ({ uri, height }) => {
    const [ loading, setLoading ] = useState<boolean>(true);

    const finishLoad = () => {
        setLoading(false)
    }

    return (
        <StyledContainer>  
            {loading &&
                <LoadingScreen>
                    <Spinner/>
                </LoadingScreen>}
            <StyledIFrame
                frameBorder="0"
                src={uri}
                height={height || '215px'}
                onLoad={finishLoad}
            />
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    position: relative;
`

const StyledIFrame = styled.iframe.attrs({
    className: "w-100 ba br3 mt1"
})`
    border-color: purple;
`

const LoadingScreen = styled.div.attrs({
    className: "w-100 h-100 flex items-center justify-center absolute"
})``

export default EvidenceDisplay;