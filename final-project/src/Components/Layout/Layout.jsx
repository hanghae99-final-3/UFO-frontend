import React from "react";
import Header from "./Header";
import Main from "./Main";
import Float from "./Float";
import styled from "styled-components";
import { useSelector } from "react-redux";
import theme from "../../Styles/theme";

/**
 * @author jiyeong
 * @param
 * @returns 앱의 전체 레이아웃
 * @역할 앱의 헤더와 메인 렌더링
 * @필수값
 */
const Layout = ({ children }) => {
    const isDarkTheme = useSelector(state => state.user.isDarkTheme);
    return (
        <StyledLayout isDarkTheme={isDarkTheme}>
            <Header isDarkTheme={isDarkTheme} />
            <Main>{children}</Main>
            <Float />
        </StyledLayout>
    );
};

const StyledLayout = styled.div`
    /* ${props => props.isDarkTheme && `background:${theme.color.black}`} */
`;

export default Layout;
