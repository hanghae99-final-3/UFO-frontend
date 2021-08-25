import React from "react";
import logo from "../../Assets/logo.svg";
import { makeStyles } from "@material-ui/styles";

import { Grid } from "@material-ui/core";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import { history } from "../../Redux/configureStore";
import { useFormik } from "formik";

const useStyles = makeStyles({
    mainContainer: {
        width: "100%",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    titleContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "30px",
    },
    formContainer: {
        width: "343px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    inputContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
});

const SignupPresenter = ({ validate, onSignupSubmit }) => {
    const classes = useStyles();

    const signupFormik = useFormik({
        initialValues: {
            email: "",
            nickname: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: validate,
        onSubmit: async ({ nickname, email, password }, actions) => {
            onSignupSubmit(nickname, email, password);
        },
    });
    return (
        <Grid item className={classes.mainContainer} xs={12}>
            <Slogan>U학생들의 FREE한 O늘!</Slogan>
            <Logoimg src={logo} />
            <Grid className={classes.formContainer}>
                <Grid className={classes.formContainer}>
                    <Form
                        onSubmit={signupFormik.handleSubmit}
                        className={classes.inputContainer}
                    >
                        <InputWrapper>
                            <InputboxName>이메일</InputboxName>
                            <Input
                                placeholder="이메일을 입력해주세요"
                                name="email"
                                type="email"
                                autocomplete="off"
                                {...signupFormik.getFieldProps("email")}
                            />
                            {signupFormik.touched.email &&
                            signupFormik.errors.email ? (
                                <ErrorBox>{signupFormik.errors.email}</ErrorBox>
                            ) : null}
                        </InputWrapper>
                        <InputWrapper>
                            <InputboxName>비밀번호</InputboxName>
                            <Input
                                placeholder="비밀번호를 입력해주세요"
                                name="password"
                                autocomplete="off"
                                type="password"
                                {...signupFormik.getFieldProps("password")}
                            />
                            {signupFormik.touched.password &&
                            signupFormik.errors.password ? (
                                <ErrorBox>
                                    {signupFormik.errors.password}
                                </ErrorBox>
                            ) : null}
                        </InputWrapper>
                        <InputWrapper>
                            <InputboxName>비밀번호 확인</InputboxName>
                            <Input
                                placeholder="확인"
                                name="confirmPassword"
                                type="password"
                                autocomplete="off"
                                {...signupFormik.getFieldProps(
                                    "confirmPassword",
                                )}
                            />
                            {signupFormik.touched.confirmPassword &&
                            signupFormik.errors.confirmPassword ? (
                                <ErrorBox>
                                    {signupFormik.errors.confirmPassword}
                                </ErrorBox>
                            ) : null}
                        </InputWrapper>
                        <InputWrapper>
                            <InputboxName>닉네임</InputboxName>

                            <Input
                                placeholder="닉네임을 입력해주세요"
                                name="nickname"
                                type="text"
                                autocomplete="off"
                                {...signupFormik.getFieldProps("nickname")}
                            />
                            {signupFormik.touched.nickname &&
                            signupFormik.errors.nickname ? (
                                <ErrorBox>
                                    {signupFormik.errors.nickname}
                                </ErrorBox>
                            ) : null}
                        </InputWrapper>
                        <ButtonContainer>
                            <CancelButtonBox
                                onClick={() => {
                                    history.push("/");
                                }}
                            >
                                취소
                            </CancelButtonBox>
                            <SignUpButtonBox type="submit" variant="contained">
                                회원가입
                            </SignUpButtonBox>
                        </ButtonContainer>
                    </Form>
                </Grid>
            </Grid>
        </Grid>
    );
};

const Slogan = styled.div`
    ${mixin.textProps(20, "extraBold", "gray3")}
    margin-bottom: 20px;
`;
const Logoimg = styled.img`
    width: 190px;
    height: 63px;
    margin-bottom: 74px;
`;
const InputboxName = styled.div`
    margin-bottom: 20px;
    ${mixin.textProps(18, "extraBold", "black")};
    width: 344px;
`;

const ButtonContainer = styled.div`
    width: 344px;
    ${mixin.flexBox("space-between")};
`;

const CancelButtonBox = styled.button`
    margin-top: 58px;
    background-color: #dedfe0;
    ${mixin.textProps(20, "extraBold", "white")}
    width: 164px;
    height: 46px;
    border-radius: 23px;
`;

const SignUpButtonBox = styled.button`
    margin-top: 58px;
    background-color: ${({ theme }) => theme.color.mainBlue};
    ${mixin.textProps(20, "extraBold", "white")}
    width: 164px;
    height: 46px;
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

const ErrorBox = styled.div`
    margin-top: 2px;
    ${mixin.textProps(12, "semiBold", "danger")}
`;

const Form = styled.form``;

const InputWrapper = styled.div`
    margin-bottom: 39px;
`;

export default SignupPresenter;
