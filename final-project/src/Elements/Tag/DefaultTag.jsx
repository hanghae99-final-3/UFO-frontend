import React from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import { useSelector } from "react-redux";

//announcement는 공지글인 경우 true입니다.

const DefaultTag = ({ children, ...props }) => {
    const isDarkTheme = useSelector(state => state.user.isDarkTheme); //다크모드인지 아닌지 판별 state

    return (
        <Tag isDarkTheme={isDarkTheme} {...props}>
            {children}
        </Tag>
    );
};

const Tag = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    min-width: 94px;
    border-radius: 16px;
    ${mixin.outline("2px solid", "blue1")};
    ${props => (props.isDarkTheme ? mixin.darkBoxShadow() : mixin.boxShadow())};
    ${props =>
        mixin.textProps(
            18,
            "semiBold",
            props.isDarkTheme ? "mainGray" : "gray1",
        )};
    background-color: ${props =>
        props.isDarkTheme ? props.theme.color.black : props.theme.color.white};
    ${props => props.rightGap && `margin-right:${props.rightGap};`};
    ${props => props.leftGap && `margin-left:${props.leftGap};`};
    @media ${({ theme }) => theme.mobile} {
        min-width: ${({ theme }) => theme.calRem(62)};
        height: ${({ theme }) => theme.calRem(24)};
        ${props =>
            mixin.textProps(
                11,
                "semiBold",
                props.isDarkTheme ? "mainGray" : "gray1",
            )};
    }
`;

export default DefaultTag;
