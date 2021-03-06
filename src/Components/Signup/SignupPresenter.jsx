import React, { useState } from "react";
import styled from "styled-components"; // 스타일 컴포넌트 라이브러기

import desktopLogo from "../../Assets/desktop_logo.svg"; // ufo 로고
import desktopLogoDark from "../../Assets/desktop_logo_dark.svg"; // ufo 로고
import mixin from "../../Styles/Mixin"; // 믹스인 객체
import { history } from "../../Redux/configureStore"; // 히스토리 객체
import { useFormik } from "formik"; // formik 훅스
import instance from "../../Shared/api";
import axios from "axios";
import { useSelector } from "react-redux";

const SignupPresenter = ({ validate, onSignupSubmit }) => {
    const [isValidNickname, setIsValidNickname] = useState(false);
    const isDarkTheme = useSelector(state => state.user.isDarkTheme);

    // formik 훅스 + validationSchema
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
        <MainContainer>
            <LogoContainer>
                <Slogan isDarkTheme={isDarkTheme}>U학생들의 FREE한 O늘!</Slogan>
                <LogoImg src={isDarkTheme ? desktopLogoDark : desktopLogo} />
            </LogoContainer>
            <Form onSubmit={signupFormik.handleSubmit}>
                <InputWrapper>
                    <InputBoxName isDarkTheme={isDarkTheme}>
                        이메일
                    </InputBoxName>
                    <Input
                        isDarkTheme={isDarkTheme}
                        placeholder="이메일을 입력해주세요"
                        name="email"
                        type="email"
                        autocomplete="off"
                        {...signupFormik.getFieldProps("email")}
                    />
                    {signupFormik.touched.email && signupFormik.errors.email ? (
                        <ErrorBox>{signupFormik.errors.email}</ErrorBox>
                    ) : null}
                </InputWrapper>
                <InputWrapper>
                    <InputBoxName isDarkTheme={isDarkTheme}>
                        비밀번호
                    </InputBoxName>
                    <Input
                        isDarkTheme={isDarkTheme}
                        placeholder="비밀번호를 입력해주세요"
                        name="password"
                        autocomplete="off"
                        type="password"
                        {...signupFormik.getFieldProps("password")}
                    />
                    {signupFormik.touched.password &&
                    signupFormik.errors.password ? (
                        <ErrorBox>{signupFormik.errors.password}</ErrorBox>
                    ) : null}
                </InputWrapper>
                <InputWrapper>
                    <InputBoxName isDarkTheme={isDarkTheme}>
                        비밀번호 확인
                    </InputBoxName>
                    <Input
                        isDarkTheme={isDarkTheme}
                        placeholder="확인"
                        name="confirmPassword"
                        type="password"
                        autocomplete="off"
                        {...signupFormik.getFieldProps("confirmPassword")}
                    />
                    {signupFormik.touched.confirmPassword &&
                    signupFormik.errors.confirmPassword ? (
                        <ErrorBox>
                            {signupFormik.errors.confirmPassword}
                        </ErrorBox>
                    ) : null}
                </InputWrapper>
                <InputWrapper>
                    <InputBoxName isDarkTheme={isDarkTheme}>
                        닉네임
                    </InputBoxName>

                    <Input
                        isDarkTheme={isDarkTheme}
                        placeholder="닉네임을 입력해주세요"
                        name="nickname"
                        type="text"
                        autocomplete="off"
                        {...signupFormik.getFieldProps("nickname")}
                    />
                    {/* <button
                        onClick={async () => {
                            console.log(signupFormik.values.nickname);
                            const body = {
                                nickname: signupFormik.values.nickname,
                            };

                            await instance
                                .get("util/nickname", body)
                                .then(res => console.log(res));
                        }}
                    >
                        중복확인
                    </button> */}
                    {signupFormik.touched.nickname &&
                    signupFormik.errors.nickname ? (
                        <ErrorBox>{signupFormik.errors.nickname}</ErrorBox>
                    ) : null}
                </InputWrapper>
                <ButtonContainer>
                    <CancelButtonBox
                        onClick={() => history.push("/login")}
                        isDarkTheme={isDarkTheme}
                    >
                        취소
                    </CancelButtonBox>
                    <SignUpButtonBox type="submit" variant="contained">
                        회원가입
                    </SignUpButtonBox>
                </ButtonContainer>
            </Form>
        </MainContainer>
    );
};

// 메인 컨테이너
const MainContainer = styled.div`
    ${mixin.flexBox("center", "center", "column", null)}
`;
// 로고 + 슬로건 감싸는 컨테이너
const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 60px;
    @media ${({ theme }) => theme.mobile} {
        width: 160px;
        height: 51px;
    }
`;

// 회원가입창 최상단 슬로건
const Slogan = styled.span`
    ${props =>
        mixin.textProps(20, "extraBold", props.isDarkTheme ? "white" : "gray3")}
    margin-bottom: 20px;

    //모바일 사이즈
    @media ${({ theme }) => theme.mobile} {
        ${props =>
            mixin.textProps(
                16,
                "extraBold",
                props.isDarkTheme ? "white" : "gray3",
            )}
        margin-bottom: 17px;
    }
`;
// ufo 로고 이미지
const LogoImg = styled.img`
    width: 190px;
    height: 63px;
    //모바일 사이즈
    @media ${({ theme }) => theme.mobile} {
        width: 160px;
        height: 51px;
    }
`;

// 입력창 이름 + 입력창 감싸는 컨테이너
const InputWrapper = styled.div`
    margin-bottom: 39px;
`;

// 폼 && 인풋 컨텐츠 컨테이너
const Form = styled.form`
    @media ${({ theme }) => theme.mobile} {
        width: 70%;
    }
`;

// 입력창 상단에 name tag
const InputBoxName = styled.span`
    display: block;
    margin-bottom: 20px;
    ${props =>
        mixin.textProps(
            18,
            "extraBold",
            props.isDarkTheme ? "white" : "black",
        )};
    @media ${({ theme }) => theme.mobile} {
        ${props =>
            mixin.textProps(
                16,
                "extraBold",
                props.isDarkTheme ? "white" : "black",
            )};
        margin-bottom: 16px;
    }
`;

const ButtonContainer = styled.div`
    margin-top: 58px;
    ${mixin.flexBox("space-between")};
    @media ${({ theme }) => theme.mobile} {
        ${mixin.flexBox("center")};
        margin-top: 40px;
    }
`;

const CancelButtonBox = styled.button`
    width: 164px;
    height: 46px;
    border-radius: 23px;
    background-color: ${props =>
        props.isDarkTheme
            ? props.theme.color.gray1
            : props.theme.color.mainGray};
    ${({ theme, isDarkTheme }) =>
        mixin.textProps(20, "extraBold", isDarkTheme ? "black" : "white")};
    @media ${({ theme }) => theme.mobile} {
        width: 118px;
        height: 32px;
        ${({ theme, isDarkTheme }) =>
            mixin.textProps(16, "extraBold", isDarkTheme ? "black" : "white")};
    }
`;
const SignUpButtonBox = styled.button`
    background-color: ${({ theme }) => theme.color.mainBlue};
    ${mixin.textProps(20, "extraBold", "white")}
    width: 164px;
    height: 46px;
    border-radius: 23px;
    margin-left: 32px;

    @media ${({ theme }) => theme.mobile} {
        width: 118px;
        height: 32px;
        ${mixin.textProps(16, "extraBold", "white")}
    }
`;

const Input = styled.input`
    transition: border-color 1s ease;
    padding-bottom: 5px;
    width: 100%;
    border: none;
    border-radius: 0px;
    background: none;
    ::placeholder {
        ${props =>
            mixin.textProps(
                18,
                "semiBold",
                props.isDarkTheme ? "gray2" : "gray4",
            )}
    }
    ${mixin.textProps(18, "semiBold", "gray3")}
    ${props =>
        mixin.outline(
            "1px solid",
            props.isDarkTheme ? "gray1" : "mainGray",
            "bottom",
        )};
    :focus {
        ${props => mixin.outline("1px solid", "gray1", "bottom")};
    }

    @media ${({ theme }) => theme.mobile} {
        ::placeholder {
            ${props =>
                mixin.textProps(
                    14,
                    "semiBold",
                    props.isDarkTheme ? "gray2" : "gray4",
                )}
        }
        ${mixin.textProps(14, "semiBold", "gray3")}
    }
`;

const ErrorBox = styled.div`
    margin-top: 2px;
    ${mixin.textProps(12, "semiBold", "danger")}

    @media ${({ theme }) => theme.mobile} {
        margin-top: 7px;
        ${mixin.textProps(11, "semiBold", "danger")}
    }
`;

export default SignupPresenter;
