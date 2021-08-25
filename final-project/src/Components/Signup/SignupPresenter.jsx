import React from "react";
import styled from "styled-components"; // 스타일 컴포넌트 라이브러기

import logo from "../../Assets/logo.svg"; // ufo 로고
import mixin from "../../Styles/Mixin"; // 믹스인 객체
import { history } from "../../Redux/configureStore"; // 히스토리 객체
import { useFormik } from "formik"; // formik 훅스

const SignupPresenter = ({ validate, onSignupSubmit }) => {
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
                <Slogan>U학생들의 FREE한 O늘!</Slogan>
                <LogoImg src={logo} />
            </LogoContainer>

            <Form onSubmit={signupFormik.handleSubmit}>
                <InputWrapper>
                    <InputBoxName>이메일</InputBoxName>
                    <Input
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
                    <InputBoxName>비밀번호</InputBoxName>
                    <Input
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
                    <InputBoxName>비밀번호 확인</InputBoxName>
                    <Input
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
                    <InputBoxName>닉네임</InputBoxName>

                    <Input
                        placeholder="닉네임을 입력해주세요"
                        name="nickname"
                        type="text"
                        autocomplete="off"
                        {...signupFormik.getFieldProps("nickname")}
                    />
                    {signupFormik.touched.nickname &&
                    signupFormik.errors.nickname ? (
                        <ErrorBox>{signupFormik.errors.nickname}</ErrorBox>
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
        </MainContainer>
    );
};

// 메인 컨테이너
const MainContainer = styled.div`
    ${mixin.flexBox("center", "center", "column", null)}
`;
// 로고 + 슬로건 감싸는 컨테이너
const LogoContainer = styled.div``;

// 회원가입창 최상단 슬로건
const Slogan = styled.div`
    ${mixin.textProps(20, "extraBold", "gray3")}
    margin-bottom: 20px;
`;
// ufo 로고 이미지
const LogoImg = styled.img`
    width: 190px;
    height: 63px;
    margin-bottom: 74px;
`;

// 입력창 이름 + 입력창 감싸는 컨테이너
const InputWrapper = styled.div`
    margin-bottom: 39px;
`;

// 폼 && 인풋 컨텐츠 컨테이너
const Form = styled.form``;

// 입력창 상단에 name tag
const InputBoxName = styled.div`
    margin-bottom: 20px;
    ${mixin.textProps(18, "extraBold", "black")};
    width: 344px;
`;

const ButtonContainer = styled.div`
    margin-top: 58px;
    width: 344px;
    ${mixin.flexBox("space-between")};
`;

const CancelButtonBox = styled.button`
    background-color: #dedfe0;
    ${mixin.textProps(20, "extraBold", "white")}
    width: 164px;
    height: 46px;
    border-radius: 23px;
`;
const SignUpButtonBox = styled.button`
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

export default SignupPresenter;
