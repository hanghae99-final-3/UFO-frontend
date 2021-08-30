import React from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import { useSelector } from "react-redux";

// gap은 '10px'처럼 string 형식으로 주어야하며, 오른쪽 여백을 줍니다.
const DangerButton = ({ children, onClick, ...props }) => {
    const isDarkTheme = useSelector(state => state.user.isDarkTheme); //다크모드인지 아닌지 판별 state

    return (
        <Button onClick={onClick} isDarkTheme={isDarkTheme} {...props}>
            {children}
        </Button>
    );
};

const Button = styled.button`
    padding: 0 10px;
    height: 32px;
    min-width: 80px;
    border-radius: 20px;
    background: ${({ theme }) => theme.color.gray3};
    ${mixin.boxShadow()}
    ${props =>
        mixin.textProps(18, "semiBold", props.isDarkTheme ? "black" : "white")};
    ${props => props.rightGap && `margin-right: ${props.rightGap};`};
    ${props => props.leftGap && `margin-left: ${props.leftGap};`};
    &:hover {
        background: ${({ theme }) => theme.color.danger};
    }
    ${props =>
        props.lastNoGap &&
        `:last-child{
        margin:0;
    }`}
    ${props =>
        props.fistNoGap &&
        `:first-child{
        margin:0;
    }`}

    @media ${({ theme }) => theme.mobile} {
        min-width: ${({ theme }) => theme.calRem(56)};
        height: ${({ theme }) => theme.calRem(24)};
        ${props =>
            mixin.textProps(
                11,
                "semiBold",
                props.isDarkTheme ? "black" : "white",
            )};
    }
`;

export default DangerButton;
