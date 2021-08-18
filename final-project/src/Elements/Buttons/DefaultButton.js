import React from "react";
import styled from "styled-components";
import mixin from "../../styles/Mixin";

// gap은 '10px'처럼 string 형식으로 주어야하며, 오른쪽 여백을 줍니다.
const DefaultButton = ({ children, gap }) => {
    const styles = { gap };
    return <Button {...styles}>{children}</Button>;
};

const Button = styled.button`
    padding: 10px 0;
    min-width: 80px;
    border-radius: 20px;
    background: ${({ theme }) => theme.color.blue1};
    ${mixin.textProps(18, "semiBold", "white")};
    margin-right: ${props => props.gap};
    &:hover {
        background: ${({ theme }) => theme.color.mainBlue};
    }
`;

export default DefaultButton;
