import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import MypageModal from "./MypageModal";
import { useDispatch, useSelector } from "react-redux";
import { editUserProfileDB } from "../../redux/async/user";
import mixin from "../../styles/Mixin";

const MypageAccount = props => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const [newNickname, setNewNickname] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [password, setPassword] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const [isNicknameEditMode, setIsNicknameEditMode] = useState(false);

    const handlePassword = e => {
        setPassword(e.target.value);
    };
    const handleNicknameEditToggle = () => {
        setIsNicknameEditMode(!isNicknameEditMode);
    };
    const handleNicknameChange = e => {
        setNewNickname(e.target.value);
    };
    const onNicknameChangeClick = () => {
        if (newNickname && password) {
            const data = {
                nickname: newNickname,
                userId: user?.user_id,
                password: password,
            };
            dispatch(editUserProfileDB(data));
        }
        setNewNickname("");
    };

    const [isEmailEditMode, setIsEmailEditMode] = useState(false);
    const handleEmailEditToggle = () => {
        setIsEmailEditMode(!isEmailEditMode);
    };
    const handleEmailChange = e => {
        setNewEmail(e.target.value);
    };
    const onEmailChangeClick = () => {
        if (newEmail && password) {
            const data = {
                email: user?.email,
                userId: user?.user_id,
                password: password,
            };
            dispatch(editUserProfileDB(data));
        }
        setNewEmail("");
    };

    const openModal = () => {
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <TitleWrapper>
                <Title>계정관리</Title>
            </TitleWrapper>
            <ControlContainer>
                <ControlButton onClick={openModal}>학교 인증</ControlButton>
                <ControlButton onClick={handleNicknameEditToggle}>
                    닉네임 설정
                </ControlButton>
                <ControlButton onClick={handleEmailEditToggle}>
                    로그인 이메일 변경
                </ControlButton>
                <ControlButton>비밀번호 설정</ControlButton>
            </ControlContainer>
            <TitleWrapper>
                <Title>기타</Title>
            </TitleWrapper>
            <DeleteAccountButton>탈퇴하기</DeleteAccountButton>
        </>
    );
};

const Title = styled.span`
    display: block;
    ${mixin.textProps(30, "extraBold", "gray2")}
`;
const TitleWrapper = styled.div``;

const ControlContainer = styled.div``;
const ControlButton = styled.button`
    background-color: white;
    ${mixin.outline("2px solid", "blue3")}
    ${mixin.textProps(18, "semiBold", "gray3")}
`;

const DeleteAccountButton = styled.button`
    padding: 10px 30px;
    border: 1px solid #707070;
    font-size: 15px;
    background-color: white;
    color: #707070;
`;

export default MypageAccount;
