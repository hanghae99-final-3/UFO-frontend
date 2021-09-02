import React, { useState, useEffect } from "react";
import mixin from "../../Styles/Mixin";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

//컴포넌트
import MyCommentedList from "../../Components/Mypage/MyCommentedList";
import MyPostList from "../../Components/Mypage/MyPostList";
import Swal from "sweetalert2";

const MyPost = props => {
    const { path } = useParams();
    const isDarkTheme = useSelector(state => state.user.isDarkTheme);

    const username = useSelector(state => state.user.user.nickname); // 로그인 유저 닉네임
    const [selectedButton, setSelectedButton] = useState(""); // 선택된 버튼 값
    // 데스크탑 사이즈인지 아닌지 판별하는 변수
    const isMobile =
        document.documentElement.clientWidth <= 1080 ? true : false;

    useEffect(() => {
        if (path) {
            if (path === "post") {
                setSelectedButton("myPostButton");
            } else if (path === "comment") {
                setSelectedButton("myCommentButton");
            }
        }
    }, []);

    // 버튼 클릭 핸들러
    const handleButtonSelect = e => {
        if (e.target.name === "alarmButton") {
            setSelectedButton("alarmButton");
        } else if (e.target.name === "myPostButton") {
            setSelectedButton("myPostButton");
        } else {
            setSelectedButton("myCommentButton");
        }
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>UFO - 함께한 순간들</title>
            </Helmet>
            <MyPostHeaderContainer>
                <MyPostHeader isDarkTheme={isDarkTheme}>
                    {isMobile
                        ? `UFO가 함께한 순간들`
                        : `${username} 님과 UFO가 함께한 순간들`}
                </MyPostHeader>
            </MyPostHeaderContainer>
            <ButtonContainer isDarkTheme={isDarkTheme}>
                <Button
                    isDarkTheme={isDarkTheme}
                    name="alarmButton"
                    selectedButton={selectedButton}
                    onClick={() => Swal.fire("서비스 준비중입니다!")}
                >
                    최근 알림
                </Button>
                <Button
                    isDarkTheme={isDarkTheme}
                    name="myPostButton"
                    selectedButton={selectedButton}
                    onClick={handleButtonSelect}
                >
                    내가 쓴 글
                </Button>
                <Button
                    isDarkTheme={isDarkTheme}
                    name="myCommentButton"
                    selectedButton={selectedButton}
                    onClick={handleButtonSelect}
                >
                    내가 쓴 댓글
                </Button>
            </ButtonContainer>
            {selectedButton === "myPostButton" && <MyPostList />}
            {selectedButton === "myCommentButton" && <MyCommentedList />}
        </React.Fragment>
    );
};

export default MyPost;

const MyPostHeaderContainer = styled.div`
    padding-bottom: 10px;
    @media ${({ theme }) => theme.mobile} {
        padding-bottom: 6px;
    }
`;
const ButtonContainer = styled.div`
    padding: 9px 0;
    margin-bottom: 19px;
    ${props =>
        mixin.outline(
            "1.5px solid",
            props.isDarkTheme ? "darkLine" : "gray4",
            "top",
        )}
    ${mixin.outline("1.5px solid", "gray4", "bottom")}
     //모바일 사이즈
     @media ${({ theme }) => theme.mobile} {
        border-bottom: none;
        margin-bottom: ${({ theme }) => theme.calRem(13)};
    }
`;
const MyPostHeader = styled.span`
    ${props =>
        mixin.textProps(
            30,
            "extraBold",
            props.isDarkTheme ? "white" : "black",
        )};

    //모바일 사이즈
    @media ${({ theme }) => theme.mobile} {
        ${props =>
            mixin.textProps(
                22,
                "extraBold",
                props.isDarkTheme ? "white" : "black",
            )};
    }
`;
const Button = styled.button`
    height: 40px;
    width: 164px;
    background: none;
    border-radius: 75px;
    :nth-child(2) {
        margin: 0 30px;
    }
    ${props =>
        mixin.outline(
            "2px solid",
            props.name === props.selectedButton ? "mainMint" : "blue3",
        )};
    ${props => {
        if (props.isDarkTheme) {
            return mixin.textProps(
                18,
                "semiBold",
                props.name === props.selectedButton ? "mainGray" : "gray2",
            );
        } else {
            return mixin.textProps(
                18,
                "semiBold",
                props.name === props.selectedButton ? "black" : "gray3",
            );
        }
    }};

    //모바일 사이즈
    @media ${({ theme }) => theme.mobile} {
        height: ${({ theme }) => theme.calRem(24)};
        width: ${({ theme }) => theme.calRem(89)};
        ${props => {
            if (props.isDarkTheme) {
                return mixin.textProps(
                    11,
                    "semiBold",
                    props.name === props.selectedButton ? "mainGray" : "gray2",
                );
            } else {
                return mixin.textProps(
                    11,
                    "semiBold",
                    props.name === props.selectedButton ? "black" : "gray3",
                );
            }
        }};
        :nth-child(2) {
            margin: 0 ${({ theme }) => theme.calRem(10)};
        }
    }
`;
