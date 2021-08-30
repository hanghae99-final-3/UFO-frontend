import React from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import { useSelector } from "react-redux";

//announcement는 공지글인 경우 true입니다.

const DefaultTag = ({ children, announcement, ...props }) => {
    const isDarkTheme = useSelector(state => state.user.isDarkTheme); //다크모드인지 아닌지 판별 state

    return (
        <Tag announcement={announcement} isDarkTheme={isDarkTheme} {...props}>
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
    ${props => props.rightGap && `margin-right:${props.rightGap};`};
    ${props => props.leftGap && `margin-left:${props.leftGap};`};
    border-radius: 16px;
    ${mixin.boxShadow()}
    ${mixin.textProps(18, "semiBold", "gray1")};
    background-color: ${props =>
        props.announcement
            ? props.theme.color.mainMint
            : props.theme.color.white};
    ${props =>
        mixin.outline("2px solid", props.announcement ? "mainMint" : "blue1")};

    @media ${({ theme }) => theme.mobile} {
        min-width: ${({ theme }) => theme.calRem(62)};
        height: ${({ theme }) => theme.calRem(24)};
        ${mixin.textProps(11, "semiBold", "gray1")};
    }
`;

export default DefaultTag;
