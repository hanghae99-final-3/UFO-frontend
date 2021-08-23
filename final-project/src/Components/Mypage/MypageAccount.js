import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import * as Yup from "yup";
import { useFormik } from "formik";
import mixin from "../../styles/Mixin";
import { editUserProfileDB } from "../../redux/async/user";
import randomString from "randomstring";
import instance, { userApi } from "../../api";
import Swal from "sweetalert2";
import { logoutUser, updateUsername } from "../../redux/modules/userSlice";
import confirm from "../../confirm";

const MypageAccount = props => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user); // 로그인 유저 정보

    // 서버에서 유저에게 발송하는 이메일 인증 코드 저장
    const [authCode, setAuthCode] = useState(randomString.generate(7));
    // 이메일 인증 성공 메세지
    const [emailAuthMsg, setEmailAuthMsg] = useState("");
    // 버튼의 클릭 유뮤로 styled component의 색상을 변경해주기 위한 상태 값
    const [selectedButton, setSelectedButton] = useState("");
    // 유저가 선택한 버튼에 맞는 수정 입력창의 보여주기 위한 상태 값
    const [isSchoolEditMode, setIsSchoolEditMode] = useState(false);
    // 유저가 입력한 학교 이메일
    const [inputEmail, setInputEmail] = useState("");
    // 학교 인증코드 verification 메세지
    const [authCodeMsg, setAuthCodeMsg] = useState("");
    // 닉네임 변경 모드인지 확인하는 상태 값
    const [isNicknameEditMode, setIsNicknameEditMode] = useState(false);
    // 로그인 이메일 변경 모드 확인하는 상태 값
    const [isLoginEmailEditMode, setIsLoginEmailEditMode] = useState(false);
    // 비밀번호 설정 모드 값
    const [isResetPasswordEditMode, setIsResetPasswordEditMode] =
        useState(false);

    // 버튼 클릭 핸들러
    const handleButtonClick = event => {
        // 선택된 버튼 (유저가 클리한 버튼)
        const {
            target: { name: buttonName },
        } = event;
        // 유저가 버튼을 클릭했는지 선택 유무 설정
        if (buttonName !== selectedButton) {
            setSelectedButton(buttonName);
        } else {
            setSelectedButton("");
        }
    };
    // 이메일 인증 모드 핸들러
    const handleSchoolAuth = e => {
        setIsNicknameEditMode(false);
        setIsLoginEmailEditMode(false);
        setIsSchoolEditMode(!isSchoolEditMode);
    };
    // 닉네임 변경 모드 핸들러
    const handleNicknameEditMode = e => {
        setIsSchoolEditMode(false);
        setIsLoginEmailEditMode(false);
        setIsResetPasswordEditMode(false);
        setIsNicknameEditMode(!isNicknameEditMode);
    };
    // 로그인 이메일 변경 모드 핸들러
    const handleLoginEmailEditMode = e => {
        setIsSchoolEditMode(false);
        setIsNicknameEditMode(false);
        setIsResetPasswordEditMode(false);
        setIsLoginEmailEditMode(!isLoginEmailEditMode);
    };
    // 비밀번호 설정 모드 핸들러
    const handlePasswordResetMode = e => {
        setIsSchoolEditMode(false);
        setIsLoginEmailEditMode(false);
        setIsNicknameEditMode(false);
        setIsResetPasswordEditMode(!isResetPasswordEditMode);
    };
    // 계정 삭제 핸들러
    const handleDeleteAccount = () => {
        const deleteAccountDB = async () => {
            await userApi.deleteAccount(user.user_id).then(res => {
                if (res.data.ok) {
                    Swal.fire("완료", "회원 탈퇴 성공", "success");
                    dispatch(logoutUser());
                }
            });
        };

        confirm.deleteConfirm(deleteAccountDB);
    };
    // 이메일 인증 유효성 formik & submit handler
    const emailAuthFormik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("이메일 형식을 확인해주세요.")
                .required("이메일을 입력해주세요."),
        }),
        onSubmit: async ({ email }, actions) => {
            await userApi
                .verifyUniEmail(email)
                .then(res => {
                    console.log(res.data.authCode);
                    setAuthCode(res.data.authCode);
                    setInputEmail(email);
                    setEmailAuthMsg("인증번호가 전송되었습니다.");
                    actions.resetForm(authCodeFormik.initialValues);
                })
                .catch(error => {
                    if (
                        error.response.data.message === "already existing email"
                    ) {
                        setEmailAuthMsg("이미 사용중인 이메일입니다.");
                    } else if (
                        error.response.data.message ===
                        "not supported university"
                    ) {
                        setEmailAuthMsg("현재 지원하지 않는 대학교입니다.");
                    }
                });
        },
    });
    // 인증 코드 유효성 확인 && onSubmit handler
    const authCodeFormik = useFormik({
        initialValues: {
            inputAuthCode: "",
        },
        validationSchema: Yup.object({
            inputAuthCode: Yup.number()
                .required("인증번호를 입력해주세요.")
                .typeError("인증번호는 숫자만 입력가능합니다."),
        }),
        onSubmit: async ({ inputAuthCode }, actions) => {
            if (inputAuthCode === authCode) {
                const req = {
                    email: inputEmail,
                    user_id: user?.user_id,
                };
                await userApi.checkVerifyCode(req).then(async res => {
                    if (res.data.result === "university authorized") {
                        actions.resetForm(authCodeFormik.initialValues);
                        setAuthCodeMsg("이메일 인증 성공");
                        Swal.fire("완료", "이메일 인증 성공", "success");
                        setEmailAuthMsg("");
                        setSelectedButton("");
                        setIsSchoolEditMode(false);
                    }
                });
            } else if (inputAuthCode !== authCode) {
                setAuthCodeMsg("인증코드를 확인하세요.");
            }
        },
    });
    // 닉네임 변경 formik && onSubmit handler
    const nicknameChangeFormik = useFormik({
        initialValues: {
            nickname: "",
            password: "",
        },
        validationSchema: Yup.object({
            nickname: Yup.string()
                .max(12, "닉네임은 12자리 미만으로 입력해주세요.")
                .required("닉네임을 입력해주세요"),

            password: Yup.string().required("비밀번호를 입력하세요"),
        }),
        onSubmit: async ({ nickname, password }, actions) => {
            const req = {
                userId: user.user_id,
                nickname,
                password,
            };
            await userApi
                .editUserProfile(req)
                .then(res => {
                    if (res.data.ok) {
                        dispatch(updateUsername(nickname && nickname));
                        Swal.fire("완료", "닉네임 변경 완료", "success");
                        actions.resetForm(nicknameChangeFormik.initialValues);
                        setSelectedButton("");
                        setIsNicknameEditMode(false);
                    }
                })
                .catch(error => {
                    if (error.response.data.message === "닉네임 중복") {
                        nicknameChangeFormik.errors.nickname =
                            "이미 사용중인 닉네임입니다.";
                    }
                    if (
                        error.response.data.message === "비밀번호가 틀렸습니다."
                    ) {
                        nicknameChangeFormik.errors.password =
                            error.response.data.message;
                    }
                });
        },
    });
    // 로그인 이메일 변경 formik && onSubmit handler
    const loginEmailFormik = useFormik({
        initialValues: {
            password: "",
            newEmail: "",
        },
        validationSchema: Yup.object({
            newEmail: Yup.string()
                .required("이메일을 입력해주세요.")
                .email("이메일 형식을 확인해주세요."),
            password: Yup.string().required("비밀번호를 입력하세요"),
        }),
        onSubmit: async ({ newEmail, password }, actions) => {
            const req = {
                email: newEmail,
                password,
                userId: user.user_id,
            };
            await userApi
                .editUserProfile(req)
                .then(res => {
                    if (res.data.ok) {
                        actions.resetForm(loginEmailFormik.initialValues);
                        setSelectedButton("");
                        setIsLoginEmailEditMode(false);
                        Swal.fire("완료", "이메일 변경 완료", "success");
                    }
                })
                .catch(error => {
                    if (
                        error.response.data.message === "비밀번호가 틀렸습니다."
                    ) {
                        loginEmailFormik.errors.password =
                            error.response.data.message;
                    } else if (error.response.data.message === "이메일 중복") {
                        loginEmailFormik.errors.newEmail =
                            error.response.data.message;
                    }
                });
        },
    });
    // 비밀번호 재설정 formik && onSubmit handler
    const passwordResetFormik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            newPasswordConfirm: "",
        },
        validationSchema: Yup.object({
            currentPassword:
                Yup.string().required("현재 비빌번호를 입력해주세요"),
            newPassword:
                Yup.string().required("새로운 비빌번호를 입력해주세요 "),

            newPasswordConfirm: Yup.string()
                .required("비밀번호 확인을 입력해주세요.")
                .oneOf(
                    [Yup.ref("newPassword"), null],
                    "비밀번호가 같지 않습니다.",
                ),
        }),
        onSubmit: async (
            { currentPassword, newPassword, newPasswordConfirm },
            actions,
        ) => {
            const req = {
                password: currentPassword,
                newPassword: newPassword,
                userId: user.user_id,
            };
            await userApi
                .editUserProfile(req)
                .then(res => {
                    if (res.data.ok) {
                        actions.resetForm(passwordResetFormik.initialValues);
                        setSelectedButton("");
                        setIsResetPasswordEditMode(false);
                        Swal.fire("완료", "비밀번호 변경 성공", "success");
                    }
                })
                .catch(error => {
                    if (
                        error.response.data.message === "비밀번호가 틀렸습니다."
                    ) {
                        passwordResetFormik.errors.currentPassword =
                            "비밀번호가 틀렸습니다.";
                    }
                });
        },
    });

    return (
        <>
            <TitleWrapper>
                <Title>계정관리</Title>
            </TitleWrapper>
            <ControlContainer>
                <ButtonWrapper>
                    {/* 이메일 인증  모드 핸들러 버튼 */}
                    <ControlButton
                        name="schoolButton"
                        onClick={e => {
                            handleButtonClick(e);
                            handleSchoolAuth(e);
                        }}
                        selected={selectedButton}
                    >
                        학교 인증
                    </ControlButton>
                </ButtonWrapper>
                {/* 이메일 인증 formik validation && input 창 */}
                {isSchoolEditMode && (
                    <InputContainer>
                        <InputForm onSubmit={emailAuthFormik.handleSubmit}>
                            <Input
                                id="email"
                                placeholder="학교 메일을 입력해주세요"
                                {...emailAuthFormik.getFieldProps("email")}
                                onBlur={emailAuthFormik.handleBlur}
                            />
                            {emailAuthMsg === "" &&
                            emailAuthFormik.touched.email &&
                            emailAuthFormik.errors.email ? (
                                <div>{emailAuthFormik.errors.email}</div>
                            ) : null}
                            {emailAuthMsg ? <div>{emailAuthMsg}</div> : null}
                            <InputButton type="submit">확인</InputButton>
                        </InputForm>
                        <InputForm onSubmit={authCodeFormik.handleSubmit}>
                            <Input
                                id="inputAuthCode"
                                placeholder="인증번호를 입력해주세요"
                                {...authCodeFormik.getFieldProps(
                                    "inputAuthCode",
                                )}
                            />
                            {authCodeMsg === "" &&
                            authCodeFormik.touched.inputAuthCode &&
                            authCodeFormik.errors.inputAuthCode ? (
                                <div>{authCodeFormik.errors.inputAuthCode}</div>
                            ) : null}
                            {authCodeFormik.touched.inputAuthCode &&
                            authCodeMsg ? (
                                <div>{authCodeMsg}</div>
                            ) : null}
                            <InputButton type="submit">인증</InputButton>
                        </InputForm>
                    </InputContainer>
                )}
                {/* 닉네임 변경 모드 핸들러 버튼 */}
                <ControlButton
                    name="nicknameButton"
                    onClick={e => {
                        handleButtonClick(e);
                        handleNicknameEditMode(e);
                    }}
                    selected={selectedButton}
                >
                    닉네임 설정
                </ControlButton>
                {/* 닉네임 변경 formik validation && input 창 */}
                {isNicknameEditMode && (
                    <InputContainer>
                        <InputForm onSubmit={nicknameChangeFormik.handleSubmit}>
                            <InputWrapper>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="비밀번호를 입력해주세요."
                                    {...nicknameChangeFormik.getFieldProps(
                                        "password",
                                    )}
                                />
                                {nicknameChangeFormik.touched.password &&
                                nicknameChangeFormik.errors.password ? (
                                    <div>
                                        {nicknameChangeFormik.errors.password}
                                    </div>
                                ) : null}
                                <ButtonContainer>
                                    <Input
                                        id="nickname"
                                        placeholder="변경할 닉네임을 입력해주세요."
                                        {...nicknameChangeFormik.getFieldProps(
                                            "nickname",
                                        )}
                                    />
                                    {nicknameChangeFormik.touched.nickname &&
                                    nicknameChangeFormik.errors.nickname ? (
                                        <div>
                                            {
                                                nicknameChangeFormik.errors
                                                    .nickname
                                            }
                                        </div>
                                    ) : null}
                                    <InputButton type="submit">
                                        확인
                                    </InputButton>
                                </ButtonContainer>
                            </InputWrapper>
                        </InputForm>
                    </InputContainer>
                )}
                <ButtonWrapper>
                    <ControlButton
                        name="emailButton"
                        onClick={e => {
                            handleLoginEmailEditMode(e);
                            handleButtonClick(e);
                        }}
                        selected={selectedButton}
                    >
                        로그인 이메일 변경
                    </ControlButton>
                    {isLoginEmailEditMode && (
                        <InputContainer>
                            <InputForm onSubmit={loginEmailFormik.handleSubmit}>
                                <InputWrapper>
                                    <Input
                                        id="password"
                                        type="password"
                                        autoComplete="new-password"
                                        placeholder="비밀번호를 입력해주세요."
                                        {...loginEmailFormik.getFieldProps(
                                            "password",
                                        )}
                                    />

                                    {loginEmailFormik.touched.password &&
                                    loginEmailFormik.errors.password ? (
                                        <div>
                                            {loginEmailFormik.errors.password}
                                        </div>
                                    ) : null}
                                    <ButtonContainer>
                                        <Input
                                            id="newEmail"
                                            autoComplete="new-password"
                                            placeholder="새로운 로그인 이메일을 입력해주세요."
                                            {...loginEmailFormik.getFieldProps(
                                                "newEmail",
                                            )}
                                        />
                                        {loginEmailFormik.touched.newEmail &&
                                        loginEmailFormik.errors.newEmail ? (
                                            <div>
                                                {
                                                    loginEmailFormik.errors
                                                        .newEmail
                                                }
                                            </div>
                                        ) : null}
                                        <InputButton type="submit">
                                            확인
                                        </InputButton>
                                    </ButtonContainer>
                                </InputWrapper>
                            </InputForm>
                        </InputContainer>
                    )}
                </ButtonWrapper>
                <ButtonWrapper>
                    <ControlButton
                        name="passwordButton"
                        onClick={e => {
                            handleButtonClick(e);
                            handlePasswordResetMode(e);
                        }}
                        selected={selectedButton}
                    >
                        비밀번호 설정
                    </ControlButton>
                    {isResetPasswordEditMode && (
                        <InputContainer>
                            <InputForm
                                onSubmit={passwordResetFormik.handleSubmit}
                            >
                                <InputWrapper>
                                    <Input
                                        placeholder="현재 비밀번호"
                                        type="password"
                                        {...passwordResetFormik.getFieldProps(
                                            "currentPassword",
                                        )}
                                    />
                                    {passwordResetFormik.touched
                                        .currentPassword &&
                                    passwordResetFormik.errors
                                        .currentPassword ? (
                                        <div>
                                            {
                                                passwordResetFormik.errors
                                                    .currentPassword
                                            }
                                        </div>
                                    ) : null}
                                    <Input
                                        placeholder="새로운 비빌번호"
                                        type="password"
                                        {...passwordResetFormik.getFieldProps(
                                            "newPassword",
                                        )}
                                    />
                                    {passwordResetFormik.touched.newPassword &&
                                    passwordResetFormik.errors.newPassword ? (
                                        <div>
                                            {
                                                passwordResetFormik.errors
                                                    .newPassword
                                            }
                                        </div>
                                    ) : null}
                                    <ButtonContainer>
                                        <Input
                                            type="password"
                                            placeholder="새로운 비밀번호 확인"
                                            {...passwordResetFormik.getFieldProps(
                                                "newPasswordConfirm",
                                            )}
                                        />
                                        {passwordResetFormik.touched
                                            .newPasswordConfirm &&
                                        passwordResetFormik.errors
                                            .newPasswordConfirm ? (
                                            <div>
                                                {
                                                    passwordResetFormik.errors
                                                        .newPasswordConfirm
                                                }
                                            </div>
                                        ) : null}
                                        <InputButton type="submit">
                                            설정
                                        </InputButton>
                                    </ButtonContainer>
                                </InputWrapper>
                            </InputForm>
                        </InputContainer>
                    )}
                </ButtonWrapper>
            </ControlContainer>
            <TitleWrapper>
                <Title>기타</Title>
            </TitleWrapper>
            <ControlButton name="dropAccount" onClick={handleDeleteAccount}>
                탈퇴하기
            </ControlButton>
        </>
    );
};

const TitleWrapper = styled.div`
    margin-top: 80px;
    padding-bottom: 10px;
    margin-bottom: 10px;
    ${mixin.outline("1.5px solid", "gray4", "bottom")}
`;
const Title = styled.span`
    display: block;
    ${mixin.textProps(30, "extraBold", "gray2")}
`;

const ControlContainer = styled.div`
    ${mixin.flexBox("space-between", null, "column", "40%")}
`;
const ButtonWrapper = styled.div``;
const ControlButton = styled.button`
    height: 35px;
    padding: 0 20px;
    width: fit-content;
    border-radius: 20px;
    background-color: white;
    ${props =>
        mixin.outline(
            "2px solid",
            props.selected === props.name ? "mainMint" : "blue3",
        )}
    ${props =>
        mixin.textProps(
            18,
            "semiBold",
            props.selected === props.name ? "black" : "gray3",
        )}
`;

const InputContainer = styled.div`
    margin: 15px 0 40px 40px;
    ${mixin.flexBox(null, null, "column")}
`;
const InputForm = styled.form`
    ${mixin.flexBox(null, "flex-end")}
`;
const Input = styled.input`
    height: 37px;
    width: 35%;
    border: none;
    ${mixin.outline("1px solid", "gray2", "bottom")}
    ${mixin.textProps(18, "semiBold", "gray1")}
    ::placeholder {
        ${mixin.textProps(18, "semiBold", "gray3")}
    }
`;
const InputButton = styled.button`
    width: 80px;
    height: 32px;
    border-radius: 40px;
    margin-left: 10px;
    ${mixin.textProps(18, "semiBold", "white")}
    background-color: ${props => props.theme.color.blue1}
`;

const InputWrapper = styled.div`
    width: 100%;
    ${mixin.flexBox(null, null, "column")}
`;

const ButtonContainer = styled.div`
    ${mixin.flexBox(null, "flex-end")}
`;

export default MypageAccount;
