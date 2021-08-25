import React from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";

const SmallAnnounceTag = ({ children, announcement, ...props }) => {
    return (
        <Tag announcement={announcement} {...props}>
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
    box-shadow: 0 5px 5px -4px #cdcdcd;
    background-color: ${props => props.theme.color.mint};
    ${mixin.textProps(12, "semiBold", "black", "center")};
    ${mixin.outline("2px solid", "mint")}
    ${props => props.rightGap && `margin-right:${props.rightGap};`};
    ${props => props.leftGap && `margin-left:${props.leftGap};`};

    @media ${({ theme }) => theme.mobile} {
        min-width: ${({ theme }) => theme.calRem(62)};
        height: ${({ theme }) => theme.calRem(24)};
        ${mixin.textProps(11, "semiBold", "black", "center")};
    }
`;

export default SmallAnnounceTag;
