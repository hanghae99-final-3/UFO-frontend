import React from "react";
import styled from "styled-components";
import mixin from "../../styles/Mixin";

// gap은 '10px'처럼 string 형식으로 주어야하며, 오른쪽 여백을 줍니다.
const DangerButton = ({ children, rightGap, leftGap, onClick }) => {
    const styles = { rightGap, leftGap };
    return (
        <Button onClick={onClick} {...styles}>
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
    ${mixin.textProps(18, "semiBold", "white")};
    ${props => props.rightGap && `margin-right: ${props.rightGap};`};
    ${props => props.leftGap && `margin-left: ${props.leftGap};`};
    &:hover {
        background: ${({ theme }) => theme.color.danger};
    }
`;

export default DangerButton;
