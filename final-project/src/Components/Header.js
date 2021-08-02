import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/modules/userSlice";
import { history } from "../redux/configureStore";

const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const userName = useSelector(state => state.user.user.nickname);

    return (
        <HeaderContainer>
            <LeftColumn>
                <Logo>로고</Logo>
            </LeftColumn>
            <RightColumn>
                <UserName>{userName}님</UserName>
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
                    <Control>
                        <Link to="/mypage">마이 페이지</Link>
                    </Control>
                    <Control>
                        {isLoggedIn && (
                            <button
                                onClick={() => {
                                    dispatch(logoutUser());
                                    localStorage.removeItem("token");
                                }}
                            >
                                로그아웃
                            </button>
                        )}
                    </Control>
                </Controls>
            </RightColumn>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.header`
    width: 1060px;
    margin: auto;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LeftColumn = styled.div``;

const Logo = styled.div`
    border: 1px solid #d2d2d2;
    padding: 10px 30px;
`;

const RightColumn = styled.div`
    display: flex;
    align-items: center;
`;

const UserName = styled.span`
    margin-right: 20px;
`;

const Controls = styled.ul`
    display: flex;
    padding: 0;
`;
const Control = styled.li`
    list-style: none;
    margin-right: 10px;
`;
export default Header;
