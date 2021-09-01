import React from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import { useSelector } from "react-redux";

const AnnounceTag = ({ children, ...props }) => {
    const isDarkTheme = useSelector(state => state.user.isDarkTheme); //다크모드인지 아닌지 판별 state
    return (
        <Tag {...props} isDarkTheme={isDarkTheme}>
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
    ${props => props.rightGap && `margin-right:${props.rightGap};`};
    ${props => props.leftGap && `margin-left:${props.leftGap};`};
    ${props => (props.isDarkTheme ? mixin.darkBoxShadow() : mixin.boxShadow())};
    ${mixin.textProps(18, "semiBold", "gray1")};
    background-color: ${props => props.theme.color.mainMint};
    ${mixin.outline("2px solid", "mainMint")};

    @media ${({ theme }) => theme.mobile} {
        min-width: ${({ theme }) => theme.calRem(62)};
        height: ${({ theme }) => theme.calRem(24)};
        ${mixin.textProps(11, "semiBold", "gray1")};
    }
`;

export default AnnounceTag;
