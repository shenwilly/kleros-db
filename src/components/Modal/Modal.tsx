import React, { useCallback } from "react";
import styled from "styled-components";
import { BsX } from "react-icons/bs";

interface ModalProps {
    title: string,
    isOpen: boolean;
    onDismiss: () => void,
}

const Modal: React.FC<ModalProps> = ({ isOpen, onDismiss, title, children }) => {

    const handleDismiss = useCallback(() => {
        onDismiss();
    }, [onDismiss]);
    
    return (
        <StyledOverlay isOpen={isOpen} onClick={handleDismiss}>
            <StyledModal onClick={(e) => {e.stopPropagation()}}>
                <ModalHeader>
                    <label>{title}</label>
                    <BsX className="f3 pa1 pointer" onClick={handleDismiss}/>
                </ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
            </StyledModal>
        </StyledOverlay>
    );
};

interface OverlayProps {
    isOpen?: boolean;
}

const StyledOverlay = styled.div.attrs({
    className: "z-2 items-center justify-center overflow-hidden top-0 bottom-0 left-0 right-0 fixed",
})<OverlayProps>`
    background-color: rgba(70, 70, 70, 0.5);
    display: ${props => props.isOpen ? 'flex' : 'none' }
`;

const StyledModal = styled.div.attrs({
    className: 'z-3 pa3 br4 bg-white w-80 w-50-gt-xs items-center justify-center flex flex-column'
})``;

const ModalHeader = styled.div.attrs({
    className: 'w-100 flex justify-between items-center'
})``;
const ModalBody = styled.div.attrs({
    className: 'w-100 tc pv3'
})``
 
export default Modal;
