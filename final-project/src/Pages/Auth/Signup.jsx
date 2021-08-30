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
    const signUpCheck = useSelector(state=>state.user?.errorMessage)
    React.useEffect(() => {
        
        if (isSignupSuccess) {
            dispatch(resetSignupSuccess());
            Swal.fire("완료", "회원가입 성공", "success");
            props.history.replace("/login");
        }
        
    }, [isSignupSuccess, props.history, dispatch]);

    const onSignupSubmit = (nickname, email, password) => {
        const data = {
            nickname,
            email,
            password,
        };
        if(signUpCheck==='이메일 중복'){
            Swal.fire('아쉽지만 이미 사용 중인 아이디예요.')
        } else if (signUpCheck ==='닉네임 중복'){
            Swal.fire('아쉽지만 이미 사용 중인 닉네임이에요.')
        } else {//ㅅㅂ
        dispatch(signupUserDB(data))};
        
    };


    const validate = Yup.object({
        nickname: Yup.string()
            .max(12, "닉네임은 2자에서 20자 사이로 지어주세요.")
            .min(2, "닉네임은 2자에서 20자 사이로 지어주세요.")
            .required("멋진 닉네임을 지어주세요."),
        email: Yup.string()
            .email("이메일 형식을 확인하세요.")
            .required("아이디를 채워주세요!"),
        password: Yup.string()
            .max(30, "비밀번호는 4~30자 사이로 입력해주세요")
            .min(6, "비밀번호는 4~30자 사이로 입력해주세요.")
            .required("비밀번호를 채워주세요."),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않아요. 다시 확인해주세요!")
            .required("비밀번호 확인을 입력하세요."),
    });
    return (
        <SignupPresenter validate={validate} onSignupSubmit={onSignupSubmit} />
    );
};

export default Signup;
