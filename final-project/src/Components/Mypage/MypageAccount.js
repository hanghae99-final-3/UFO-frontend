import React, { useState } from "react";
import styled from "styled-components";
import MypageModal from "./MypageModal";

const MypageAccount = props => {
    const [newNickname, setNewNickname] = useState();
    const [newEmail, setNewEmail] = useState();
    const [newPassword, setNewPassword] = useState();
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <Title>계정</Title>
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

                <ControlButton>닉네임 설정</ControlButton>
                <ControlButton>로그인 이메일 변경</ControlButton>
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
