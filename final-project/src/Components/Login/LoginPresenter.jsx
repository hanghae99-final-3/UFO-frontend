import React from "react";

import { useDispatch } from "react-redux";
import { loginUserDB } from "../../Redux/Async/user";
import { history } from "../../Redux/configureStore";

import mixin from "../../Styles/Mixin";
import styled from "styled-components";
import SocialLogin from "./SocialLogin";

import * as Yup from "yup";
import { useFormik } from "formik";

import { FormControlLabel, Checkbox } from "@material-ui/core";

const LoginPresenter = ({
    validate,
    toggleLoginMode,
    onLoginSubmit,
    socialLoginMode,
    isRememberEmailChecked,
    handleCheckBox,
}) => {
    const dispatch = useDispatch();
    const loginFormik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("이메일 형식을 확인하세요")
                .required("이메일을 입력해주세요"),
            password: Yup.string().required("비밀번호를 입력해주세요."),
        }),
        onSubmit: async ({ email, password }, actions) => {
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
                        {...loginFormik.getFieldProps("password")}
                    />
                    {loginFormik.touched.password &&
                    loginFormik.errors.password ? (
                        <ErrorBox>{loginFormik.errors.password}</ErrorBox>
                    ) : null}
                    <AutoLogin>
                        <FormControlLabel
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
                        />
                        <FormControlLabel
                            control={<Check name="autoLogin" color="primary" />}
                            label="자동 로그인"
                        />
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

const MainContainer = styled.div`
    margin-top: 12%;
    ${mixin.flexBox("center", "center", "column", null)};
`;

const LoginText = styled.div`
    width: 120px;
    ${mixin.textProps(40, "extraBold", "black")}
`;
const AutoLogin = styled.div`
    margin-top: 5px;
    width: 100%;
`;

const LoginBtn = styled.button`
    margin-top: 20px;
    width: 334px;
    height: 46px;
    ${mixin.textProps(20, "extraBold", "white")}
    background-color : ${({ theme }) => theme.color.blue1};
    border-radius: 23px;
`;

const Input = styled.input`
    transition: border-color 1s ease;
    padding-bottom: 5px;
    width: 100%;
    border: none;
    ::placeholder {
        ${mixin.textProps(18, "semiBold", "gray4")}
    }
    ${mixin.textProps(18, "semiBold", "gray3")}
    ${props => mixin.outline("1px solid", "mainGray", "bottom")};
    :focus {
        ${props => mixin.outline("1px solid", "gray1", "bottom")};
    }
`;

const Form = styled.form`
    margin-top: 50px;
    width: 320px;

    Input {
        :nth-child(2) {
            margin-top: 32px;
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
`;

const Check = styled(Checkbox)`
    .MuiCheckbox-colorSecondary.Mui-checked {
        color: ${props => props.theme.color.mint};
    }
`;

const MemberCheckBox = styled.div`
    margin-top: 27px;
    ${mixin.flexBox("center", null, null, null)}
`;
const DoYouHaveID = styled.p`
    ${mixin.textProps(20, "semiBold", "gray3")}
`;
const GoSignUp = styled.button`
    background-color: ${({ theme }) => theme.color.white};
    ${mixin.textProps(20, "semiBold", "mainBlue")}
`;

const ErrorBox = styled.div`
    margin-top: 2px;
    ${mixin.textProps(12, "semiBold", "danger")}
`;

export default LoginPresenter;
