import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

/**
 * @author jiyeong
 * @param   message:에러메세지(string), link:이동할 주소(string), buttonValue:버튼에 넣을 값(string)
 * @returns 에러페이지
 * @역할 에러페이지 렌더링
 * @필수값  message : 에러메세지를 담는 곳이다.
 */

const Error = ({ message, link, buttonValue }) => {
    return (
        <ErrorContainer>
            <p>{message}</p>
            {link && (
                <button onClick={() => history.push(link)}>
                    {buttonValue}
                </button>
            )}
        </ErrorContainer>
    );
};

const ErrorContainer = styled.div`
    height: calc(100vh - 100px);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
        font-size: 30px;
    }
    button {
        margin-top: 50px;
        padding: 20px 30px;
        font-size: 16px;
        font-weight: bold;
        border-radius: 10px;
        :hover {
            background: hsl(345deg 100% 47%);
            color: #fff;
        }
    }
`;

export default Error;
