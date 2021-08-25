import React from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";

/**
 * @author jiyeong
 * @param
 * @returns 앱의 메인
 * @역할 앱의 컨텐츠 렌더링, 반응형디자인을 하기위한 초석
 * @필수값  children:앱의 컨텐츠들이 들어가는 공간
 */

const Main = ({ children }) => {
    return <MainContainer>{children}</MainContainer>;
};

const MainContainer = styled.main`
    ${mixin.floatBox("relative")}
    max-width: 1050px;
    margin: 35px auto 0 auto;
    padding-bottom: 60px;

    @media ${({ theme }) => theme.mobile} {
        margin: 32px auto;
        padding: 0 15px;
    }
`;

export default Main;
