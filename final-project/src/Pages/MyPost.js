import React, { useState, useEffect } from "react";
import MyPostList from "../Components/MyPostList";
import styled from "styled-components";

import { userApi } from "../api";
import mixin from "../styles/Mixin";
import { useSelector } from "react-redux";
import MyCommentedList from "../Components/MyCommentedList";

const MyPost = props => {
    const username = useSelector(state => state.user.user.nickname); // 로그인 유저 닉네임
    const [selectedButton, setSelectedButton] = useState(""); // 선택된 버튼 값

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
            <MyPostHeaderContainer>
                <MyPostHeader>{username} 님과 UFO가 함께한 순간들</MyPostHeader>
            </MyPostHeaderContainer>
            <ButtonContainer>
                <Button
                    name="alarmButton"
                    selectedButton={selectedButton}
                    onClick={handleButtonSelect}
                >
                    최근 알림
                </Button>
                <Button
                    name="myPostButton"
                    selectedButton={selectedButton}
                    onClick={handleButtonSelect}
                >
                    내가 쓴 글
                </Button>
                <Button
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
`;
const ButtonContainer = styled.div`
    padding: 10px 0;
    margin-bottom: 19px;
    ${mixin.outline("1.5px solid", "gray4", "top")}
    ${mixin.outline("1.5px solid", "gray4", "bottom")}
`;
const MyPostHeader = styled.span`
    ${mixin.textProps(30, "extraBold", "black")};
`;
const Button = styled.button`
    height: 40px;
    width: 158px;
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
    ${props =>
        mixin.textProps(
            18,
            "semiBold",
            props.name === props.selectedButton ? "black" : "gray3",
        )};
`;
