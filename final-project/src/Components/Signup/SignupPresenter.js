import React from "react";
import logo from "../../assets/logo.svg";
import { Formik, Form } from "formik";
import { makeStyles } from "@material-ui/styles";
import { LoginTextField } from "../Login/LoginTextField";
import { Grid, Typography, Button } from "@material-ui/core";
import styled from "styled-components";
import mixin from "../../styles/Mixin";
import { history } from "../../redux/configureStore";

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
    return (
        <Grid item className={classes.mainContainer} xs={12}>
            <Slogan>U학생들의 FREE한 O늘!</Slogan>
            <Logoimg src={logo} />
            <Grid className={classes.formContainer}>
                <Formik
                    initialValues={{
                        email: "",
                        nickname: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    validationSchema={validate}
                    onSubmit={({ nickname, email, password }) => {
                        onSignupSubmit(nickname, email, password);
                    }}
                >
                    {formik => (
                        <Grid className={classes.formContainer}>
                            <Form className={classes.inputContainer}>
                                <InputboxName>이메일</InputboxName>
                                <LoginTextField
                                    label="이메일을 입력해주세요"
                                    name="email"
                                    type="email"
                                    style={{ marginBottom: "39px" }}
                                />
                                <InputboxName>비밀번호</InputboxName>
                                <LoginTextField
                                    label="비밀번호를 입력해주세요"
                                    name="password"
                                    type="password"
                                    style={{ marginBottom: "39px" }}
                                />
                                <InputboxName>비밀번호 확인</InputboxName>
                                <LoginTextField
                                    label="확인"
                                    name="confirmPassword"
                                    type="password"
                                    style={{ marginBottom: "39px" }}
                                />
                                <InputboxName>닉네임</InputboxName>
                                <LoginTextField
                                    label="닉네임을 입력해주세요"
                                    name="nickname"
                                    type="text"
                                    style={{ marginBottom: "39px" }}
                                />
                                <ButtonContainer>
                                    <CancelButtonBox
                                        onClick={() => {
                                            history.push("/");
                                        }}
                                    >
                                        취소
                                    </CancelButtonBox>
                                    <SignUpButtonBox
                                        type="submit"
                                        variant="contained"
                                    >
                                        회원가입
                                    </SignUpButtonBox>
                                </ButtonContainer>
                            </Form>
                        </Grid>
                    )}
                </Formik>
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

export default SignupPresenter;
