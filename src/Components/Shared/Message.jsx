import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import theme from "../../Styles/theme";
import { history } from "../../Redux/configureStore";
import { useSelector } from "react-redux";

/**
 * @author jiyeong
 * @param  strong:강조문구(string) message:에러메세지(string), link:이동할 주소(string), buttonValue:버튼에 넣을 값(string)
 * @returns 에러페이지
 * @역할 에러페이지 렌더링
 * @필수값  message : 에러메세지를 담는 곳이다.
 */

const Message = ({ strong, message, link, buttonValue }) => {
    //사용자의 미디어 크기에 따라 Message 컴포넌트가 위치한 절대 위치를 계산하여 top으로 설정하였습니다.
    //top은 사용자에게 보여질 message의 가로세로중앙정렬을 하기위해 사용하고 있습니다.
    const [top, setTop] = useState(null);
    const topRelativeFromViewport = top;
    const baseComponent = useRef(null);
    const isDarkTheme = useSelector(state => state.user.isDarkTheme);
    useEffect(() => {
        setTop(baseComponent.current.getBoundingClientRect().top);
    }, []);
    return (
        <MessageContainer
            ref={baseComponent}
            isDarkTheme={isDarkTheme}
            top={topRelativeFromViewport}
        >
            <p>
                <span>{strong}</span>
                {message}
            </p>
            {link && (
                <Button onClick={() => history.push(link)}>
                    {buttonValue}
                </Button>
            )}
        </MessageContainer>
    );
};

const MessageContainer = styled.div`
    ${mixin.floatBox("absolute")}
    ${mixin.flexBox("center", "center", "column", null)};
    height: calc(100vh - ${props => props.top}px);
    width: 100%;
    ${props => props.isDarkTheme && `background:${theme.color.black};`}
    @media ${({ theme }) => theme.mobile} {
        width: calc(100% - 30px);
    }

    p {
        ${props =>
            mixin.textProps(
                40,
                "extraBold",
                props.isDarkTheme ? "mainGray" : "gray2",
                "center",
            )};
        @media ${({ theme }) => theme.mobile} {
            ${props =>
                mixin.textProps(
                    28,
                    "extraBold",
                    props.isDarkTheme ? "mainGray" : "black",
                    "center",
                )};
        }
        span {
            ${props =>
                mixin.textProps(
                    40,
                    "extraBold",
                    props.isDarkTheme ? "white" : "black",
                    "center",
                )};
            @media ${({ theme }) => theme.mobile} {
                ${props =>
                    mixin.textProps(
                        28,
                        "extraBold",
                        props.isDarkTheme ? "white" : "black",
                        "center",
                    )};
            }
        }
    }
`;

const Button = styled.button`
    margin-top: ${({ theme }) => theme.calRem(30)};
    padding: 0 ${({ theme }) => theme.calRem(10)};
    height: ${({ theme }) => theme.calRem(46)};
    min-width: ${({ theme }) => theme.calRem(164)};
    border-radius: 20px;
    background: ${({ theme }) => theme.color.mainGray};
    ${mixin.textProps(18, "semiBold", "white")};
    ${props => props.rightGap && `margin-right: ${props.rightGap};`};
    ${props => props.leftGap && `margin-left: ${props.leftGap};`};
    &:hover {
        background: ${({ theme }) => theme.color.danger};
    }

    @media ${({ theme }) => theme.mobile} {
        ${mixin.textProps(16, "semiBold", "white")};
        margin-top: ${({ theme }) => theme.calRem(25)};
        height: ${({ theme }) => theme.calRem(32)};
        min-width: ${({ theme }) => theme.calRem(118)};
        padding: 0 ${({ theme }) => theme.calRem(5)};
    }
`;

export default Message;
