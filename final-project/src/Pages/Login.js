import React, { useState } from "react";
import { useDispatch } from "react-redux";
import LoginPresenter from "../Components/Login/LoginPresenter";

import * as Yup from "yup";
import Swal from "sweetalert2";
import { loginUserDB } from "../redux/async/user";

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

    const [socialLoginMode, setSocialLoginMode] = useState(false);

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
        />
    );
};

export default Login;
