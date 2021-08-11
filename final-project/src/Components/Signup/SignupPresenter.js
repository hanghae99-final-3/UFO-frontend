import React from "react";

import { Formik, Form } from "formik";
import { makeStyles } from "@material-ui/styles";
import { LoginTextField } from "../Login/LoginTextField";
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

const SignupPresenter = ({ validate, onSignupSubmit }) => {
    const classes = useStyles();
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
                        onSignupSubmit(nickname, email, password);
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

export default SignupPresenter;
