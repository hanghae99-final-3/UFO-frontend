import React, { useState } from "react";
import { Formik } from "formik";
import { useFormik } from "formik";

import SocialLogin from "./SocialLogin";
import styled from "styled-components";
import mixin from "../../styles/Mixin";
import { makeStyles } from "@material-ui/styles";
import { LoginTextField } from "./LoginTextField";
import * as Yup from "yup";

import { Grid, FormControlLabel, Checkbox } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { loginUserDB } from "../../redux/async/user";

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
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
});

const LoginPresenter = ({
    validate,
    toggleLoginMode,
    onLoginSubmit,
    socialLoginMode,
    isRememberEmailChecked,
    handleCheckBox,
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const loginFormik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required("이메일을 입력해주세요."),
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
        <Grid item className={classes.mainContainer} xs={12}>
            <Grid className={classes.titleContainer}>
                <LoginText variant="h4">로그인</LoginText>
            </Grid>
            {socialLoginMode ? (
                <SocialLogin toggleLoginMode={toggleLoginMode} />
            ) : (
                <Grid className={classes.formContainer}>
                    <Grid className={classes.formContainer}>
                        <Form onSubmit={loginFormik.handleSubmit}>
                            <Input
                                label="ID"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="ID"
                                {...loginFormik.getFieldProps("email")}
                            />
                            <Input
                                placeholder="PW"
                                label="PW"
                                id="password"
                                name="password"
                                type="password"
                                {...loginFormik.getFieldProps("password")}
                            />
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
                                    control={
                                        <Check
                                            name="autoLogin"
                                            color="primary"
                                        />
                                    }
                                    label="자동 로그인"
                                />
                            </AutoLogin>
                            <LoginBtn type="submit" variant="outlined">
                                로그인
                            </LoginBtn>
                        </Form>
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};

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
export default LoginPresenter;
