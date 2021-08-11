import React, { useState } from "react";
import { useSelector } from "react-redux";
import { userApi } from "../../api";

import * as Yup from "yup";
import { useFormik } from "formik";
import styled from "styled-components";

import ClearIcon from "@material-ui/icons/Clear";
import TextField from "@material-ui/core/TextField";
import { Icon, Button } from "@material-ui/core";

import randomstring from "randomstring";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Boop from "../../Elements/Boop";
import Fireworks from "../../Elements/Fireworks";

const MypageModalContent = ({ close }) => {
    const user = useSelector(state => state.user.user);
    const [emailVerificationError, setEmailVerificationError] = useState("");
    const [verificationError, setVerificationCodeError] = useState("");
    const [verificationCode, setVerificationCode] = useState(
        randomstring.generate(),
    );
    const [isVerificationSuccess, setIsVerificationSuccess] = useState(false);
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredCode, setEnteredCode] = useState("");
    const notify = () => toast("인증 메일을 발송했습니다!");

    const handleCodeSubmit = async () => {
        if (enteredCode === verificationCode) {
            try {
                const req = {
                    userId: user.user_id,
                    email: enteredEmail,
                };
                const response = await userApi.checkVerifyCode(req);
                if (response.data.result === "university authorized") {
                    setIsVerificationSuccess(true);
                    setEnteredCode("");
                    setVerificationCodeError("");
                }
            } catch (error) {
                setVerificationCodeError("인증코드를 확인하세요.");
            }
        } else if (enteredCode !== verificationCode) {
            setVerificationCodeError("인증코드를 확인하세요.");
        }
    };
    const handleCodeChange = e => {
        setEnteredCode(e.target.value);
    };

    const formik_email = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("잘못된 이메일 형식입니다.")
                .required("대학교 이메일을 입력하세요"),
        }),
        onSubmit: async values => {
            setEnteredEmail(values.email);
            try {
                const response = await userApi.verifyUniEmail(values.email);
                if (response.status === 200) {
                    console.log(response.data.authCode);
                    setVerificationCode(response.data.authCode);
                    notify();
                }
            } catch (error) {
                if (
                    error.response.data.message === "not supported university"
                ) {
                    setEmailVerificationError("지원하지 않는 대학교입니다.");
                } else if (
                    error.response.data.message === "already existing email"
                ) {
                    setEmailVerificationError("이미 사용중인 이메일입니다.");
                }
            }
        },
    });
    return (
        <React.Fragment>
            <ToastContainer limit={1} />
            <AuthModalContainer>
                <Wrapper>
                    <Title>학교 인증</Title>
                    <ClearButton className="modal-close" onClick={close}>
                        <Boop rotation={20} timing={200}>
                            <Icon>
                                <ClearIcon />
                            </Icon>
                        </Boop>
                    </ClearButton>
                </Wrapper>
                {isVerificationSuccess ? (
                    <EmailFormContainer>
                        <span>🎉 인증 성공, 축하합니다!! 🎉</span>
                        <Fireworks />
                    </EmailFormContainer>
                ) : (
                    <>
                        <EmailFormContainer>
                            <Form onSubmit={formik_email.handleSubmit}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    onChange={formik_email.handleChange}
                                    value={formik_email.values.email}
                                    {...formik_email.getFieldProps("email")}
                                    placeholder="학교 메일을 입력해주세요"
                                    InputProps={{
                                        endAdornment: (
                                            <Button type="submit">
                                                보내기
                                            </Button>
                                        ),
                                    }}
                                />

                                {formik_email.touched.email &&
                                formik_email.errors.email ? (
                                    <div>{formik_email.errors.email}</div>
                                ) : null}
                                {emailVerificationError ? (
                                    <div>{emailVerificationError}</div>
                                ) : null}
                            </Form>
                        </EmailFormContainer>
                        <ValidationCodeFormContainer>
                            <div style={{ minWidth: "400px" }}>
                                <TextField
                                    fullWidth
                                    value={enteredCode}
                                    id="validation_code"
                                    placeholder="인증번호를 입력해주세요"
                                    onChange={handleCodeChange}
                                    InputProps={{
                                        endAdornment: (
                                            <Button
                                                onClick={handleCodeSubmit}
                                                style={{ width: "100px" }}
                                            >
                                                인증하기
                                            </Button>
                                        ),
                                    }}
                                />
                                {verificationError ? (
                                    <div>{verificationError}</div>
                                ) : null}
                            </div>
                        </ValidationCodeFormContainer>
                    </>
                )}

                <CompleteButtonWrapper>
                    {isVerificationSuccess && (
                        <Button
                            variant="outlined"
                            style={{ padding: "10px 80px", marginTop: "20px" }}
                            onClick={close}
                        >
                            완료
                        </Button>
                    )}
                </CompleteButtonWrapper>
            </AuthModalContainer>
        </React.Fragment>
    );
};

const AuthModalContainer = styled.div``;
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    span {
        flex: 1;
        display: flex;
        justify-content: center;
    }
`;
const Title = styled.span`
    font-size: 35px;
    color: #707070;
`;

const ClearButton = styled.div``;

const CompleteButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const EmailFormContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const ValidationCodeFormContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;
const Form = styled.form`
    min-width: 400px;
`;

export default MypageModalContent;
