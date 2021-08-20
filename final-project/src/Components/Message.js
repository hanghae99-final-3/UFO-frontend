import React from "react";
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
    return (
        <MessageContainer>
            <p>{message}</p>
            {link && (
                <button onClick={() => history.push(link)}>
                    {buttonValue}
                </button>
            )}
        </MessageContainer>
    );
};

const MessageContainer = styled.div`
    height: calc(100vh - 100px);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
        ${mixin.textProps(30, "semiBold", "gray1")};
    }
    button {
        margin-top: 50px;
        padding: 20px 30px;
        background: ${({ theme }) => theme.color.gray4};
        ${mixin.textProps(18, "extraBold", "gray1")};
        border-radius: 25px;
        transition: all 0.3s ease;
        :hover {
            background: ${({ theme }) => theme.color.danger};
            ${mixin.textProps(18, "semiBold", "white")};
        }
    }
`;

export default Message;
