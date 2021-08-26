import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

//통신
import { loginUserDB } from "../../Redux/Async/user";

//컴포넌트
import LoginPresenter from "../../Components/Login/LoginPresenter";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";

const Login = () => {
    const dispatch = useDispatch();
    const validate = Yup.object({
        email: Yup.string()
            .email("이메일 형식을 확인하세요.")
            .required("이메일을 입력하세요."),
        password: Yup.string()
            .min(6, "비밀번호는 6자리 이상으로 입력하세요.")
            .required("비밀번호를 입력하세요."),
    });

    const [socialLoginMode, setSocialLoginMode] = useState(true);
    const [isRememberEmailChecked, setIsRememberEmailChecked] =
        React.useState(false);

    const toggleLoginMode = () => {
        setSocialLoginMode(!socialLoginMode);
    };

    const onLoginSubmit = (email, password) => {
        const data = {
            email,
            password,
        };
        dispatch(loginUserDB(data));
    };

    const handleCheckBox = () => {
        setIsRememberEmailChecked(!isRememberEmailChecked);
    };

    return (
        <LoginPresenter
            validate={validate}
            toggleLoginMode={toggleLoginMode}
            onLoginSubmit={onLoginSubmit}
            socialLoginMode={socialLoginMode}
            isRememberEmailChecked={isRememberEmailChecked}
            handleCheckBox={handleCheckBox}
            setIsRememberEmailChecked={setIsRememberEmailChecked}
        />
    );
};

export default Login;
