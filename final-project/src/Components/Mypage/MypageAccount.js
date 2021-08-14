import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import MypageModal from "./MypageModal";
import { useDispatch, useSelector } from "react-redux";
import { editUserProfileDB } from "../../redux/async/user";

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
            <Title>계정관리</Title>
            <ControlContainer>
                <ControlButton onClick={openModal}>학교 인증</ControlButton>
                {modalVisible && (
                    <MypageModal
                        visible={modalVisible}
                        closable={true}
                        maskClosable={true}
                        onClose={closeModal}
                    />
                )}

                <ControlButton onClick={handleNicknameEditToggle}>
                    닉네임 설정
                </ControlButton>
                {isNicknameEditMode && (
                    <TextField
                        style={{ width: "500px", marginLeft: "10px" }}
                        placeholder="변경할 닉네임을 입력해주세요"
                        value={newNickname}
                        onChange={handleNicknameChange}
                        InputProps={{
                            endAdornment: (
                                <Button
                                    style={{ width: "100px" }}
                                    variant="outlined"
                                    onClick={onNicknameChangeClick}
                                >
                                    변경하기
                                </Button>
                            ),
                        }}
                    />
                )}
                <ControlButton onClick={handleEmailEditToggle}>
                    로그인 이메일 변경
                </ControlButton>
                {isEmailEditMode && (
                    <TextField
                        style={{ width: "500px", marginLeft: "10px" }}
                        placeholder="변경할 이메일을 입력해주세요"
                        value={newEmail}
                        onChange={handleEmailChange}
                        InputProps={{
                            endAdornment: (
                                <Button
                                    style={{ width: "100px" }}
                                    variant="outlined"
                                    onClick={onEmailChangeClick}
                                >
                                    변경하기
                                </Button>
                            ),
                        }}
                    />
                )}

                <ControlButton>비밀번호 설정</ControlButton>
            </ControlContainer>
            <Title>기타</Title>
            <DeleteAccountButton>탈퇴하기</DeleteAccountButton>
        </>
    );
};

const Title = styled.span`
    font-size: 25px;
    color: #707070;
    margin: 50px 0 10px 0;
    display: block;
`;
const ControlContainer = styled.div`
    border: 1px solid;
    color: #707070;
    padding: 10px;
`;
const ControlButton = styled.button`
    display: block;
    color: #707070;
    background: none;
    margin: 0 0 10px 10px;
    font-size: 25px;
`;

const DeleteAccountButton = styled.button`
    padding: 10px 30px;
    border: 1px solid #707070;
    font-size: 15px;
    background-color: white;
    color: #707070;
`;

export default MypageAccount;
