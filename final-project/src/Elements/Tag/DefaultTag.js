import React from "react";
import styled from "styled-components";
import mixin from "../../styles/Mixin";

//announcement는 공지글인 경우 true입니다.

const DefaultTag = ({ children, announcement, ...props }) => {
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
    height: 32px;
    min-width: 94px;
    ${props => props.rightGap && `margin-right:${props.rightGap};`};
    ${props => props.leftGap && `margin-left:${props.leftGap};`};
    border-radius: 16px;
    box-shadow: 0 5px 5px -4px #cdcdcd;
    background-color: ${props =>
        props.announcement ? props.theme.color.mint : "white"};
    ${mixin.textProps(18, "semiBold", "gray1")};
    ${props =>
        mixin.outline("2px solid", props.announcement ? "mint" : "blue1")};
`;

export default DefaultTag;
