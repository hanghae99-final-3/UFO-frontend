import React from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import { useSelector } from "react-redux";

const SmallAnnounceTag = ({ children, announcement, ...props }) => {
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
    height: 22px;
    min-width: 74px;
    border-radius: 16px;
    ${props => (props.isDarkTheme ? mixin.darkBoxShadow() : mixin.boxShadow())};

    background-color: ${props => props.theme.color.mainMint};
    ${mixin.textProps(12, "semiBold", "black", "center")};
    ${mixin.outline("2px solid", "mainMint")}
    ${props => props.rightGap && `margin-right:${props.rightGap};`};
    ${props => props.leftGap && `margin-left:${props.leftGap};`};

    @media ${({ theme }) => theme.mobile} {
        min-width: ${({ theme }) => theme.calRem(62)};
        height: ${({ theme }) => theme.calRem(24)};
        ${mixin.textProps(11, "semiBold", "black", "center")};
    }
`;

export default SmallAnnounceTag;
