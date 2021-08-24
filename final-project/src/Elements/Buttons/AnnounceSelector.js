import React from "react";
import styled from "styled-components";
import mixin from "../../styles/Mixin";

//isSelected가 true/false일 때 스타일링이 적용되어있습니다.
const AnnounceSelector = ({ isSelected, onClick, children, ...props }) => {
    return (
        <Button isSelected={isSelected} onClick={onClick} {...props}>
            {children}
        </Button>
    );
};

const Button = styled.button`
    padding: 0 10px;
    min-width: 79px;
    min-height: 32px;
    box-sizing: border-box;
    border-radius: 16px;
    transition: all 0.5s ease;
    background-color: ${props =>
        props.isSelected ? props.theme.color.mint : props.theme.color.white};
    ${props =>
        props.isSelected
            ? mixin.textProps(18, "semiBold", "gray1")
            : mixin.textProps(18, "semiBold", "gray3")}
    ${props =>
        props.isSelected
            ? `box-shadow: inset -2px 5px 5px -5px #cdcdcd;`
            : `box-shadow:  0 5px 5px -4px #cdcdcd;`}
        ${props =>
        mixin.outline("2px solid", props.isSelected ? "mint" : "mainGray")}
        ${props => props.rightGap && `margin-right:${props.rightGap};`}
        ${props => props.leftGap && `margin-left:${props.leftGap};`}
        ${props =>
        props.lastNoGap &&
        `:last-child{
        margin:0;
    }`}
        ${props =>
        props.fistNoGap &&
        `:first-child{
        margin:0;
    }`};
`;

export default AnnounceSelector;
