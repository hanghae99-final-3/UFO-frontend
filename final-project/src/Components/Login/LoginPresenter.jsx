import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import { useDispatch } from "react-redux";
import { loginUserDB } from "../../Redux/Async/user";
import { history } from "../../Redux/configureStore";

import mixin from "../../Styles/Mixin";
import styled from "styled-components";
import SocialLogin from "./SocialLogin";

import * as Yup from "yup";
import { useFormik } from "formik";

import { Checkbox } from "@material-ui/core";

const LoginPresenter = ({
    validate,
    toggleLoginMode,
    onLoginSubmit,
    socialLoginMode,
    isRememberEmailChecked,
    handleCheckBox,
    setIsRememberEmailChecked,
}) => {
    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(["rememberEmail"]);

    const [email, setEmail] = useState("");
    useEffect(() => {
        if (cookies.rememberEmail !== undefined) {
            setEmail(cookies.rememberEmail);
        }
    }, []);
    const loginFormik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("이메일 형식을 확인하세요.")
                .required("이메일을 입력해주세요."),
            password: Yup.string().required("비밀번호를 입력해주세요."),
        }),
        onSubmit: async ({ email, password }, actions) => {
            if (isRememberEmailChecked) {
                setCookie("rememberEmail", email, { maxAge: 2000 });
            } else {
                removeCookie("rememberEmail");
            }
            const data = {
                email,
                password,
            };
            dispatch(loginUserDB(data));
        },
    });
    return (
        <MainContainer>
            <div>
                <LoginText variant="h4">로그인</LoginText>
            </div>
            {socialLoginMode ? (
                <SocialLogin toggleLoginMode={toggleLoginMode} />
            ) : (
                <Form onSubmit={loginFormik.handleSubmit}>
                    <Input
                        label="ID"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="ID"
                        {...loginFormik.getFieldProps("email")}
                    />
                    {loginFormik.touched.email && loginFormik.errors.email ? (
                        <ErrorBox>{loginFormik.errors.email}</ErrorBox>
                    ) : null}
                    <Input
                        placeholder="PW"
                        label="PW"
                        id="password"
                        name="password"
                        type="password"
                        checked={email}
                        {...loginFormik.getFieldProps("password")}
                    />
                    {loginFormik.touched.password &&
                    loginFormik.errors.password ? (
                        <ErrorBox>{loginFormik.errors.password}</ErrorBox>
                    ) : null}
                    <AutoLogin>
                        {/* <FormControlLabel
                            control={
                                <Check
                                    checked={isRememberEmailChecked}
                                    onChange={handleCheckBox}
                                    name="rememberEmail"
                                    MenuProps={{
                                        disablePortal: true,
                                    }}
                                />
                            }
                            label="아이디 저장"
                        /> */}
                    </AutoLogin>
                    <LoginBtn type="submit" variant="outlined">
                        로그인
                    </LoginBtn>
                    <MemberCheckBox>
                        <DoYouHaveID>UFO와 함께하실래요?</DoYouHaveID>
                        <GoSignUp
                            onClick={() => {
                                history.push("/signup");
                            }}
                        >
                            회원가입하기
                        </GoSignUp>
                    </MemberCheckBox>
                </Form>
            )}
        </MainContainer>
    );
};

// 메인  최상위 컨테이너
const MainContainer = styled.div`
    /* margin-top: ${({ theme }) => theme.calRem(197)}; */
    height: 80vh;
    ${mixin.flexBox("center", "center", "column", null)};

    @media ${({ theme }) => theme.mobile} {
        height: 70vh;
    }
`;

// 폼 && 컨텐츠 컨테이너
const Form = styled.form`
    margin-top: ${({ theme }) => theme.calRem(50)};
    width: 344px;
    Input {
        :nth-child(2) {
            margin-top: ${({ theme }) => theme.calRem(32)};
        }
    }
    svg {
        color: ${props => props.theme.color.blue3};
    }
    .Mui-checked {
        svg {
            color: ${props => props.theme.color.mint};
        }
    }
    .MuiTypography-root {
        ${mixin.textProps(18, "semiBold", "black")}
    }

    // 모바일 사이즈
    @media ${({ theme }) => theme.mobile} {
        margin-top: ${({ theme }) => theme.calRem(35)};
        width: ${({ theme }) => theme.calRem(264)};
        .MuiTypography-root {
            ${mixin.textProps(14, "semiBold", "black")}
        }
        .MuiButtonBase-root {
            padding: 2px 3px;
            margin-left: 8px;
        }
    }
`;

// 로그인 타이틀
const LoginText = styled.span`
    width: ${({ theme }) => theme.calRem(120)};
    ${mixin.textProps(40, "extraBold", "black")}

    @media ${({ theme }) => theme.mobile} {
        ${mixin.textProps(22, "extraBold", "black")}
    }
`;
const AutoLogin = styled.div`
    width: 100%;
    margin-top: ${({ theme }) => theme.calRem(5)};
    //모바일 사이즈
    @media ${({ theme }) => theme.mobile} {
        margin-top: ${({ theme }) => theme.calRem(2)};
    }
`;
const Check = styled(Checkbox)`
    .MuiCheckbox-colorSecondary.Mui-checked {
        color: ${props => props.theme.color.mint};
    }
`;

const LoginBtn = styled.button`
    margin-top: ${({ theme }) => theme.calRem(20)};
    width: 344px;
    height: 46px;
    ${mixin.textProps(20, "extraBold", "white")};
    background-color: ${({ theme }) => theme.color.blue1};
    border-radius: 23px;

    @media ${({ theme }) => theme.mobile} {
        width: ${({ theme }) => theme.calRem(264)};
        height: ${({ theme }) => theme.calRem(40)};
        ${mixin.textProps(16, "extraBold", "white")};
    }
`;

const Input = styled.input`
    transition: border-color 1s ease;
    padding: ${({ theme }) => theme.calRem(10)};
    width: 100%;
    border: none;
    border-radius: 0px;
    ::placeholder {
        ${mixin.textProps(18, "semiBold", "gray4")}
    }
    ${mixin.textProps(18, "semiBold", "gray3")}
    ${props => mixin.outline("1px solid", "mainGray", "bottom")};
    :focus {
        ${props => mixin.outline("1px solid", "gray1", "bottom")};
    }

    @media ${({ theme }) => theme.mobile} {
        ::placeholder {
            ${mixin.textProps(14, "semiBold", "gray4")}
        }
        ${mixin.textProps(14, "semiBold", "gray3")}
    }
`;

// 체크박스
const MemberCheckBox = styled.div`
    width: 100%;
    margin-top: ${({ theme }) => theme.calRem(27)};
    ${mixin.flexBox("space-between", null, null, null)}

    //모바일 사이즈
    @media ${({ theme }) => theme.mobile} {
        margin-top: ${({ theme }) => theme.calRem(22)};
    }
`;

// 회원가입 문구
const DoYouHaveID = styled.p`
    ${mixin.textProps(20, "semiBold", "gray3")}
    //모바일 사이즈
    @media ${({ theme }) => theme.mobile} {
        ${mixin.textProps(16, "semiBold", "gray3")}
    }
`;

// 회원가입 하러가기 버튼
const GoSignUp = styled.button`
    background-color: ${({ theme }) => theme.color.white};
    ${mixin.textProps(20, "semiBold", "mainBlue")}
    //모바일 사이즈
    @media ${({ theme }) => theme.mobile} {
        ${mixin.textProps(16, "semiBold", "mainBlue")}
    }
`;

// 에러 메세지 박스
const ErrorBox = styled.div`
    margin-top: ${({ theme }) => theme.calRem(2)};
    ${mixin.textProps(12, "semiBold", "danger")}
    @media ${({ theme }) => theme.mobile} {
        margin-top: 7px;
        ${mixin.textProps(11, "semiBold", "danger")}
    }
`;

export default LoginPresenter;
