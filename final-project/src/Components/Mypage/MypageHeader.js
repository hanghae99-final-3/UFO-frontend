import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "../../redux/modules/userSlice";
import { onLogout } from "../../redux/modules/univBoardSlice";
import { history } from "../../redux/configureStore";

const MypageHeader = props => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const handleLogout = () => {
        dispatch(logoutUser());
        dispatch(onLogout());
        localStorage.removeItem("token");
        history.replace("/");
    };
    return (
        <React.Fragment>
            <MyPageHeader>
                <PageTitle>마이 페이지</PageTitle>

                {user && user.school_auth && (
                    <UnivName>
                        {user && user.university && user.university.name}
                    </UnivName>
                )}

                <Wrapper>
                    <Greeting>
                        <Nickname>{user && user.nickname} 님 </Nickname>
                        반갑습니다!!
                    </Greeting>
                    <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
                </Wrapper>
                <MyActivityContainer>
                    <ActivityTitle>내 활동 보기</ActivityTitle>

                    <ActivityButton
                        onClick={() => alert("서비스 준비중 입니다")}
                    >
                        최근 알림
                    </ActivityButton>
                    <ActivityButton
                        onClick={() => alert("서비스 준비중 입니다")}
                        style={{ margin: "0 50px" }}
                    >
                        내가 쓴 글
                    </ActivityButton>
                    <ActivityButton
                        onClick={() => alert("서비스 준비중 입니다")}
                    >
                        내가 쓴 댓글
                    </ActivityButton>
                </MyActivityContainer>
            </MyPageHeader>
        </React.Fragment>
    );
};

//-------- 마이페이지 해더 스타일-----------
const MyPageHeader = styled.div``;
const PageTitle = styled.span`
    font-weight: 400;
    font-size: 30px;
    display: block;
    color: #707070;
`;
const UnivName = styled.span`
    font-weight: 400;
    font-size: 20px;
    color: #707070;
    margin-top: 10px;
    display: block;
`;
const Greeting = styled.span`
    font-weight: 400;
    font-size: 30px;
    color: #707070;
`;
const Nickname = styled.span`
    font-weight: 500;
    font-size: 40px;
    color: #707070;
`;
const LogoutButton = styled.button`
    padding: 10px 40px;
    background-color: #d9d9d9;
    border: 1px solid;
    font-size: 20px;
`;
const Wrapper = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;

const MyActivityContainer = styled.div`
    margin-top: 100px;
`;
const ActivityButton = styled.button`
    padding: 10px 30px;
    border: 1px solid #707070;
    font-size: 15px;
    background-color: white;
    color: #707070;
`;
//----
const ActivityTitle = styled.span`
    display: block;
    font-weight: 400;
    font-size: 30px;
    color: #707070;
    margin-bottom: 20px;
`;

export default MypageHeader;
