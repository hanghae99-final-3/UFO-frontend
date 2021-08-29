import React from "react";
import Header from "./Header";
import Main from "./Main";
import Float from "./Float";

/**
 * @author jiyeong
 * @param
 * @returns 앱의 전체 레이아웃
 * @역할 앱의 헤더와 메인 렌더링
 * @필수값
 */
const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <Main>{children}</Main>
            <Float />
        </>
    );
};

export default Layout;
