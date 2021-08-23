import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "../../redux/modules/userSlice";
import { onLogout } from "../../redux/modules/univBoardSlice";
import { history } from "../../redux/configureStore";

import Trend from "react-trend";
import mixin from "../../styles/Mixin";

const MypageHeader = props => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const handleLogout = () => {
        dispatch(logoutUser());
        dispatch(onLogout());
        localStorage.removeItem("token");
        history.replace("/");
    };

    const handleGoToMypost = () => {
        history.push("/mypost");
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
                    {/* <Trend
                        smooth
                        autoDraw
                        autoDrawDuration={3000}
                        autoDrawEasing="ease-out"
                        data={[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]}
                        gradient={["#00c6ff", "#F0F", "#FF0"]}
                        radius={10.5}
                        strokeWidth={1.3}
                        strokeLinecap={"butt"}
                    /> */}
                </MyActivityContainer>
                <MyActivityButtonContainer>
                    <ActivityButton
                        onClick={() => alert("서비스 준비중 입니다")}
                    >
                        <ActivityButtonText>최근 알림</ActivityButtonText>
                    </ActivityButton>
                    <ActivityButton onClick={handleGoToMypost}>
                        <ActivityButtonText>내가 쓴 글</ActivityButtonText>
                    </ActivityButton>
                    <ActivityButton
                        onClick={() => alert("서비스 준비중 입니다")}
                    >
                        <ActivityButtonText>내가 쓴 댓글</ActivityButtonText>
                    </ActivityButton>
                </MyActivityButtonContainer>
            </MyPageHeader>
        </React.Fragment>
    );
};

//-------- 마이페이지 해더 스타일-----------
const MyPageHeader = styled.div``;

const UnivNameBox = styled.div`
    margin-top: 20px;
    ${mixin.flexBox("space-between", "flex-end")}
`;

const UnivName = styled.span`
    display: block;
    ${mixin.textProps(20, "semiBold", "gray2")}
`;
const Greeting = styled.span`
    ${mixin.textProps(40, "extraBold", "black")}
`;

const LogoutButton = styled.button`
    width: 108px;
    height: 32px;
    border-radius: 60px;
    background-color: ${props => props.theme.color.mainBlue};
    ${mixin.textProps(18, "semiBold", "white")}
`;

const MyActivityContainer = styled.div`
    margin: 70px 0 10px 0;
    padding-bottom: 5px;
    ${mixin.outline("1.5px solid", "gray4", "bottom")}
`;
const ActivityTitle = styled.span`
    ${mixin.textProps(30, "extraBold", "black")}
`;

const MyActivityButtonContainer = styled.div`
    width: 50%;
    ${mixin.flexBox("space-between")};
`;
const ActivityButton = styled.div`
    width: 150px;
    border-radius: 76px;
    ${mixin.flexBox("center", "center", null, "40px")};
    ${mixin.outline("2px solid", "blue3")};
    ${mixin.textProps(18, "semiBold", "gray3")}
`;
const ActivityButtonText = styled.span``;

export default MypageHeader;
