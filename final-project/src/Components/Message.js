import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import mixin from "../styles/Mixin";

/**
 * @author jiyeong
 * @param   message:에러메세지(string), link:이동할 주소(string), buttonValue:버튼에 넣을 값(string)
 * @returns 에러페이지
 * @역할 에러페이지 렌더링
 * @필수값  message : 에러메세지를 담는 곳이다.
 */

const Message = ({ message, link, buttonValue }) => {
    //사용자의 미디어 크기에 따라 Message 컴포넌트가 위치한 절대 위치를 계산하여 top으로 설정하였습니다.
    //top은 사용자에게 보여질 message의 가로세로중앙정렬을 하기위해 사용하고 있습니다.
    const [top, setTop] = useState(null);
    const topRelativeFromViewport = top;
    const baseComponent = useRef(null);
    useEffect(() => {
        setTop(baseComponent.current.getBoundingClientRect().top);
    }, []);
    return (
        <MessageContainer ref={baseComponent} top={topRelativeFromViewport}>
            <p>{message}</p>
            {link && (
                <Button onClick={() => history.push(link)}>
                    {buttonValue}
                </Button>
            )}
        </MessageContainer>
    );
};

const MessageContainer = styled.div`
    height: calc(100vh - ${props => props.top}px);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
        ${mixin.textProps(40, "extraBold", "black")};
    }
`;

const Button = styled.button`
    margin-top: 30px;
    padding: 0 10px;
    height: 46px;
    min-width: 164px;
    border-radius: 20px;
    background: ${({ theme }) => theme.color.mainGray};
    ${mixin.textProps(18, "semiBold", "white")};
    ${props => props.rightGap && `margin-right: ${props.rightGap};`};
    ${props => props.leftGap && `margin-left: ${props.leftGap};`};
    &:hover {
        background: ${({ theme }) => theme.color.danger};
    }
`;

export default Message;
