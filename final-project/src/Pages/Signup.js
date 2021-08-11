import React from "react";
import { signupUserDB } from "../redux/async/user";
import SignupPresenter from "../Components/Signup/SignupPresenter";

import * as Yup from "yup";
import { resetSignupSuccess } from "../redux/modules/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Signup = props => {
    const dispatch = useDispatch();
    const isSignupSuccess = useSelector(state => state.user.isSignupSuccess);
    React.useEffect(() => {
        if (isSignupSuccess) {
            dispatch(resetSignupSuccess());
            alert("성공");
            props.history.replace("/login");
        }
    }, [isSignupSuccess, props.history, dispatch]);

    const onSignupSubmit = (nickname, email, password) => {
        const data = {
            nickname,
            email,
            password,
        };
        dispatch(signupUserDB(data));
    };

    const validate = Yup.object({
        nickname: Yup.string()
            .max(15, "닉네임은 15자리 이하로 작성하세요.")
            .required("닉네임을 입력하세요."),
        email: Yup.string()
            .email("이메일 형식을 확인하세요.")
            .required("이메일을 입력하세요."),
        password: Yup.string()
            .min(6, "비밀번호는 6자리 이상으로 입력하세요.")
            .required("비밀번호를 입력하세요."),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "비밀번호가 같지 않습니다.")
            .required("비밀번호 확인을 입력하세요."),
    });
    return (
        <SignupPresenter validate={validate} onSignupSubmit={onSignupSubmit} />
    );
};

export default Signup;
