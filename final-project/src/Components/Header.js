import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <HeaderContainer>
            <Controls>
                <Control>
                    <Link to="/">홈</Link>
                </Control>
                <Control>
                    <Link to="/login">로그인</Link>
                </Control>
                <Control>
                    <Link to="/signup">회원가입</Link>
                </Control>
                <Control>
                    <Link to="/freeboard">자유게시판</Link>
                </Control>
                <Control>
                    <Link to="/univboard">대학게시판</Link>
                </Control>
            </Controls>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.header``;
const Controls = styled.ul`
    display: flex;
    padding: 0;
`;
const Control = styled.li`
    list-style: none;
    margin-right: 10px;
`;
export default Header;
