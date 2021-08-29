import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Portal from "./Portal";
import DangerButton from "../../Elements/Buttons/DangerButton";
import mixin from "../../Styles/Mixin";
import CloseIcon from "@material-ui/icons/Close";

//onClose는 모달창을 닫을 때 후처리 함수입니다.
//closable은 닫기버튼을 쓸건지 말건지에 대한 판별값입니다.
//extend는 모달창을 폭넓게 쓸 때 사용하기 위한 값입니다.
//참고링크 https://medium.com/@bestseob93/%ED%9A%A8%EC%9C%A8%EC%A0%81%EC%9D%B8-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%AA%A8%EB%8B%AC-react-modal-%EB%A7%8C%EB%93%A4%EA%B8%B0-bd003458e9d
function Modal({
    className,
    onClose,
    maskClosable,
    closable,
    visible,
    children,
    extend,
    width,
    height,
}) {
    const onMaskClick = e => {
        if (e.target === e.currentTarget) {
            onClose(e);
        }
        document.body.style.cssText = `overflow:auto;`;
    };

    const close = e => {
        if (onClose) {
            onClose(e);
        }
        document.body.style.cssText = `overflow:auto;`;
    };

    useEffect(() => {
        //모달창 열리면 스크롤 막기!
        document.body.style.cssText = `overflow:hidden;`;
    }, []);

    const styles = { extend, width, height };

    return (
        <Portal elementId="modal-root">
            <ModalOverlay visible={visible} />
            <ModalWrapper
                className={className}
                onClick={maskClosable ? onMaskClick : null}
                tabIndex={-1}
                visible={visible}
            >
                <ModalInner tabIndex={0} className="modal-inner" {...styles}>
                    {closable && (
                        //버전 1
                        // <CloseBox>
                        //     <DangerButton
                        //         className="modal-close"
                        //         onClick={close}
                        //     >
                        //         X
                        //     </DangerButton>
                        // </CloseBox>

                        //버전2
                        <CloseBox>
                            <CloseButton
                                className="modal-close"
                                onClick={close}
                            >
                                <CloseIcon>X</CloseIcon>
                            </CloseButton>
                        </CloseBox>
                    )}
                    {children}
                </ModalInner>
            </ModalWrapper>
        </Portal>
    );
}

Modal.defaultProps = {
    visible: false,
    closable: true,
    maskClosable: true,
};

Modal.propTypes = {
    visible: PropTypes.bool,
};

const ModalWrapper = styled.div`
    box-sizing: border-box;
    display: ${props => (props.visible ? "block" : "none")};
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    overflow: auto;
    outline: 0;
`;

const ModalOverlay = styled.div`
    box-sizing: border-box;
    display: ${props => (props.visible ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 999;
`;

const ModalInner = styled.div`
    box-sizing: border-box;
    position: relative;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
    background-color: #fff;
    min-width: 360px;
    min-height: 100px;
    //모달창을 광범위하게 쓰고싶다면 초기화하고, 아니면 중앙정렬로 셋팅합니다.
    ${props => (props.extend ? "" : `border-radius: 10px;`)}
    ${props => (props.extend ? "" : `top : 50%;`)};
    ${props => (props.extend ? "" : `transform: translateY(-50%);`)};

    //사용자 지정 width와 height가 있으면 지정해줍니다.
    ${props => (props.width ? `width:${props.width};` : "")}
    ${props => (props.height ? `width:${props.height};` : "")}
    margin: 0 auto;
    padding: 20px;
`;

const CloseBox = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const CloseButton = styled.div`
    cursor: pointer;
`;

export default Modal;
