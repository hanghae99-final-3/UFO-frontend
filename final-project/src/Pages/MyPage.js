import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import rand from "random-key";
import { userApi } from "../api";
import { deleteAccountDB, editUserProfileDB } from "../redux/async/user";

const MyPage = props => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const [isVerifyRequested, setIsVerifyRequested] = useState(false);
    const [email, setEmail] = useState("");
    const [verifyCode, setVerifyCode] = useState(rand.generate());
    const [userInputCode, setUserInputCode] = useState("");
    const handleChange = e => {
        setEmail(e.target.value);
    };

    const handleVerifyCodeInput = e => {
        setUserInputCode(e.target.value);
    };
    const handleCodeSubmit = async () => {
        if (verifyCode === userInputCode) {
            const data = {
                userId: user.user_id,
                email,
            };
            await userApi.checkVerifyCode(data);
        }
    };

    const handleSubmit = async () => {
        if (email) {
            setIsVerifyRequested(true);
            const {
                data: { authCode },
            } = await userApi.verifyUniEmail(email);
            setVerifyCode(authCode);
            console.log(authCode);
        }
    };

    //---------------여기서부터 수정 기능 -----------------------------
    const [editNickname, setEditNickname] = useState(user?.nickname);
    const [editEmail, setEditEmail] = useState(user?.email);
    const [editPassword, setEditPassword] = useState("");

    const handleEditOnChange = e => {
        const {
            target: { name },
        } = e;
        const {
            target: { value },
        } = e;
        if (name === "nickname") {
            setEditNickname(value);
        } else if (name === "email") {
            setEditEmail(value);
        } else {
            setEditPassword(value);
        }
    };
    const handleEditUser = () => {
        const data = {
            email: editEmail,
            nickname: editNickname,
            password: editPassword,
            userId: user.user_id,
        };
        dispatch(editUserProfileDB(data));
    };

    //--------------탈퇴
    const handleDeleteAccount = () => {
        const data = {
            userId: user.user_id,
        };
        dispatch(deleteAccountDB(data));
    };
    return (
        <React.Fragment>
            <div>
                <span>안녕하세요 {user && user.nickname}</span>
            </div>
            <label htmlFor="email">이메일</label>
            <input id="email" onChange={handleChange} value={email} />
            <button onClick={handleSubmit}>이메일 인증</button>
            {isVerifyRequested && (
                <div>
                    <label htmlFor="verifyCode">인증번호 입력</label>
                    <input
                        id="verifyCode"
                        value={userInputCode}
                        onChange={handleVerifyCodeInput}
                    ></input>
                    <button onClick={handleCodeSubmit}>인증하기</button>
                </div>
            )}

            <div style={{ marginTop: "50px" }}>
                <span>개인정보 수정</span>
                <label htmlFor="nickname">닉네임</label>
                <input
                    name="nickname"
                    value={editNickname}
                    onChange={handleEditOnChange}
                ></input>
                <label htmlFor="email">이메일</label>
                <input
                    name="email"
                    value={editEmail}
                    onChange={handleEditOnChange}
                ></input>
                <label htmlFor="password">비밀번호</label>
                <input
                    name="password"
                    type="password"
                    value={editPassword}
                    onChange={handleEditOnChange}
                ></input>
                <button onClick={handleEditUser}>수정하기</button>
            </div>
            <div>
                <button
                    style={{ marginTop: "50px" }}
                    onClick={handleDeleteAccount}
                >
                    탈퇴
                </button>
            </div>
        </React.Fragment>
    );
};

export default MyPage;
