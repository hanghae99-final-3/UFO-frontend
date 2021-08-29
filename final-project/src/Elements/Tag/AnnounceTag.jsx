import React from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";

const AnnounceTag = ({ children, ...props }) => {
    return <Tag {...props}>{children}</Tag>;
};

const Tag = styled.span`
    display: inline-block;
    height: 32px;
    min-width: 74px;
    line-height: 28px;
    margin-right: 20px;
    border-radius: 16px;
    ${mixin.boxShadow()}
    background-color: ${props => props.theme.color.mint};
    ${mixin.outline("2px solid", "mint")};
    ${mixin.textProps(18, "semiBold", "gray1", "center")};
    ${props => props.rightGap && `margin-right:${props.rightGap};`};
    ${props => props.leftGap && `margin-left:${props.leftGap};`};

    @media ${({ theme }) => theme.mobile} {
        min-width: ${({ theme }) => theme.calRem(62)};
        height: ${({ theme }) => theme.calRem(24)};
        ${mixin.textProps(11, "semiBold", "gray1")};
    }
`;

export default AnnounceTag;
