import React from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";

const SmallTag = ({ children, announcement, ...props }) => {
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
    background-color: ${props =>
        props.announcement ? props.theme.color.mint : "white"};
    ${props =>
        mixin.textProps(12, "semiBold", props.announcement ? "black" : "gray1")}
    ${props =>
        mixin.outline("2px solid", props.announcement ? "mint" : "blue1")};
    ${props => props.rightGap && `margin-right:${props.rightGap};`};
    ${props => props.leftGap && `margin-left:${props.leftGap};`};
`;

export default SmallTag;
