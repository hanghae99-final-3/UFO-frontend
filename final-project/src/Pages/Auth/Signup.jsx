import React from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

//통신
import { signupUserDB } from "../../Redux/Async/user";
import { resetSignupSuccess } from "../../Redux/Modules/userSlice";

//컴포넌트
import SignupPresenter from "../../Components/Signup/SignupPresenter";
import Swal from "sweetalert2";

const Signup = props => {
    const dispatch = useDispatch();
    const isSignupSuccess = useSelector(state => state.user.isSignupSuccess);
    React.useEffect(() => {
        if (isSignupSuccess) {
            dispatch(resetSignupSuccess());
            Swal.fire("완료", "UFO에 오신걸 환영해요!🛸", "success");
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
            .max(15, "닉네임은 15자 이하로 작성해주세요!")
            .min(2, "닉네임은 2자 이상으로 작성해주세요!")
            .required("닉네임을 입력하세요."),
        email: Yup.string()
            .email("이메일 형식을 확인하세요.")
            .required("이메일을 입력하세요."),
        password: Yup.string()
            .min(4, "비밀번호는 4자리 이상 입력해주세요")
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
