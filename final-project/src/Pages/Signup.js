import React from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Yup from "yup";
import { Formik, Form } from "formik";

import { makeStyles } from "@material-ui/styles";
import { LoginTextField } from "../Elements/LoginTextField";
import { Grid, Typography, Button } from "@material-ui/core";
import { signupUserDB } from "../redux/async/user";
import { resetSignupSuccess } from "../redux/modules/userSlice";

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

    const classes = useStyles();
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
        <Grid item className={classes.mainContainer} xs={12}>
            <Grid className={classes.titleContainer}>
                <Typography variant="h4">회원가입</Typography>
                <Typography style={{ fontSize: "12px", color: "#AE01FF" }}>
                    유학생들 다 모여라, 캥거루에서 소통하자!
                </Typography>
            </Grid>
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
                        const data = {
                            nickname,
                            email,
                            password,
                        };

                        dispatch(signupUserDB(data));
                    }}
                >
                    {formik => (
                        <Grid className={classes.formContainer}>
                            <Form className={classes.inputContainer}>
                                <LoginTextField
                                    label="Nickname"
                                    name="nickname"
                                    type="text"
                                />
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
                                <LoginTextField
                                    label="Confirm Password"
                                    name="confirmPassword"
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
                                    회원가입
                                </Button>
                            </Form>
                        </Grid>
                    )}
                </Formik>
            </Grid>
        </Grid>
    );
};

export default Signup;
