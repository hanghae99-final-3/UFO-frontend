import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "../../Redux/Modules/userSlice";
import { onLogout } from "../../Redux/Modules/univBoardSlice";
import { history } from "../../Redux/configureStore";

import Trend from "react-trend";
import mixin from "../../Styles/Mixin";
import DefaultButton from "../../Elements/Buttons/DefaultButton";

const MypageHeader = props => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const handleLogout = () => {
        dispatch(logoutUser());
        dispatch(onLogout());
        localStorage.removeItem("token");
        history.replace("/");
    };

    const handleGoToMyPost = e => {
        if (e.target.name === "myPost") {
            history.push("/mypost/post");
        } else {
            history.push("/mypost/comment");
        }
    };
    return (
        <React.Fragment>
            <MyPageHeader>
                {user && user.school_auth && (
                    <UnivName>
                        {user && user.university && user.university.name}
                    </UnivName>
                )}

                <UnivNameBox>
                    <Greeting>{user && user.nickname}님, 반갑습니다!!</Greeting>
                    <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
                </UnivNameBox>
                <MyActivityContainer>
                    <ActivityTitle>내 활동 보기</ActivityTitle>
                </MyActivityContainer>
                <MyActivityButtonContainer>
                    <ActivityButton
                        onClick={() => alert("서비스 준비중 입니다")}
                    >
                        최근 알림
                    </ActivityButton>
                    <ActivityButton name="myPost" onClick={handleGoToMyPost}>
                        내가 쓴 글
                    </ActivityButton>
                    <ActivityButton name="myComment" onClick={handleGoToMyPost}>
                        내가 쓴 댓글
                    </ActivityButton>
                </MyActivityButtonContainer>
            </MyPageHeader>
        </React.Fragment>
    );
};

// 스타일 컴포넌트
const MyPageHeader = styled.div`
    margin-bottom: 75px;
`;
// 대학교 이름 + 로그아웃 버튼 감싸는 div
const UnivNameBox = styled.div`
    ${mixin.flexBox("space-between", "flex-end")}
`;
//대학교 이름
const UnivName = styled.span`
    display: block;
    margin-bottom: 10px;
    ${mixin.textProps(20, "semiBold", "gray2")}
`;
// 로그아웃 버튼
const LogoutButton = styled.button`
    width: 108px;
    height: 32px;
    border-radius: 60px;
    background-color: ${props => props.theme.color.mainBlue};
    ${mixin.textProps(18, "semiBold", "white")}
`;
// 유저네임 + 인사말 span
const Greeting = styled.span`
    margin-bottom: 70px;
    ${mixin.textProps(40, "extraBold", "black")}
`;
// 내 활동 보기 버튼들을 감싸는 div 컨테이너
const MyActivityContainer = styled.div`
    padding-bottom: 5px;
    ${mixin.outline("1.5px solid", "gray4", "bottom")}
`;
// "내 활동 보기" 문구
const ActivityTitle = styled.span`
    ${mixin.textProps(30, "extraBold", "black")}
`;
// 내 활동 보기 안에 버튼 3개 감싸는 div (최근 알림, 내가 쓴글, etc)
const MyActivityButtonContainer = styled.div`
    margin-top: 20px;
    width: 50%;
    ${mixin.flexBox("space-between")};
`;
//내 활동 보기 버튼
const ActivityButton = styled.button`
    width: 150px;
    border-radius: 76px;
    background: none;
    ${mixin.flexBox("center", "center", null, "40px")};
    ${mixin.outline("2px solid", "blue3")};
    ${mixin.textProps(18, "semiBold", "gray3")}
`;

export default MypageHeader;
