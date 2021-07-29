import React from "react";
import { useDispatch } from "react-redux";

import * as Yup from "yup";
import { Formik, Form } from "formik";

import Kakao from "../assets/pngegg.png";
import { loginUserDB } from "../redux/async/user";

import { makeStyles } from "@material-ui/styles";
import { LoginTextField } from "../Elements/LoginTextField";
import { Grid, Typography, Button } from "@material-ui/core";

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
    inputContainer: {
        width: "320px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
});

const Login = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const validate = Yup.object({
        email: Yup.string()
            .email("이메일 형식을 확인하세요.")
            .required("이메일을 입력하세요."),
        password: Yup.string()
            .min(6, "비밀번호는 6자리 이상으로 입력하세요.")
            .required("비밀번호를 입력하세요."),
    });
    return (
        <Grid item className={classes.mainContainer} xs={12}>
            <Grid className={classes.titleContainer}>
                <Typography variant="h4">로그인</Typography>
                <Typography style={{ fontSize: "12px", color: "#AE01FF" }}>
                    유학생들 다 모여라, 캥거루에서 소통하자!
                </Typography>
            </Grid>
            <Grid className={classes.formContainer}>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={validate}
                    onSubmit={({ email, password }) => {
                        const data = {
                            email,
                            password,
                        };

                        dispatch(loginUserDB(data));
                    }}
                >
                    {formik => (
                        <Grid className={classes.formContainer}>
                            <Form className={classes.inputContainer}>
                                <LoginTextField
                                    label="Email"
                                    name="email"
                                    type="email"
                                />
                                <LoginTextField
                                    label="Password"
                                    name="password"
                                    type="password"
                                />
                                <Button
                                    style={{
                                        marginTop: "20px",
                                        width: "320px",
                                        height: "40px",
                                        borderRadius: "10px",
                                        backgroundColor: "#AE01FF",
                                        color: "#ffffff",
                                    }}
                                    type="submit"
                                    variant="contained"
                                >
                                    로그인
                                </Button>
                                <Button
                                    // onClick={() => dispatch(kakaoLogin())}
                                    style={{
                                        marginTop: "20px",
                                        width: "320px",
                                        height: "40px",
                                        borderRadius: "10px",
                                        backgroundColor: "#FEE500",
                                        color: "black",
                                    }}
                                    variant="contained"
                                    startIcon={
                                        <img
                                            src={Kakao}
                                            alt=""
                                            style={{
                                                width: "20px",
                                            }}
                                        />
                                    }
                                >
                                    <a href="http://3.36.90.60/api/kakao">
                                        로그인
                                    </a>
                                </Button>
                            </Form>
                        </Grid>
                    )}
                </Formik>
            </Grid>
        </Grid>
    );
};

export default Login;
