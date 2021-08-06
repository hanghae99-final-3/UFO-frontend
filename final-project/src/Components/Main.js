import React from "react";
import styled from "styled-components";

const Main = ({ children }) => {
    return <MainContainer>{children}</MainContainer>;
};

const MainContainer = styled.main`
    width: 1060px;
    margin: 0 auto 50px auto;
`;

export default Main;
