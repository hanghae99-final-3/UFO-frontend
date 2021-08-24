import React from "react";
import styled from "styled-components";
import mixin from "../../styles/Mixin";

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
    box-shadow: 0 5px 5px -4px #cdcdcd;
    background-color: ${props => props.theme.color.mint};
    ${mixin.outline("2px solid", "mint")};
    ${mixin.textProps(18, "semiBold", "gray1", "center")};
    transform: translatey(100px);
`;

export default AnnounceTag;
