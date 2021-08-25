import React from "react";
import { Button } from "@material-ui/core";
import theme from "../../styles/theme";
import styled from "styled-components";
import mixin from "../../styles/Mixin";
import { history } from "../../redux/configureStore";
import axios from "axios";

const SocialLogin = ({ toggleLoginMode }) => {
    return (
        <React.Fragment>
            <ButtonBox variant="outlined" onClick={toggleLoginMode}>
                이메일로 로그인
            </ButtonBox>
            <GoogleButtonBox variant="outlined">구글 로그인</GoogleButtonBox>
            <FBButtonBox variant="outlined">페이스북 로그인</FBButtonBox>
            <KakaoButtonBox variant="outlined">
                <a href="http://3.36.90.60/auth/kakao">카카오 로그인</a>
            </KakaoButtonBox>
            <MemberCheckBox>
                <DoYouHaveID>아직 아이디가 없으신가요?</DoYouHaveID>
                <GoSignUp
                    onClick={() => {
                        history.push("/signup");
                    }}
                >
                    회원가입하기
                </GoSignUp>
            </MemberCheckBox>
        </React.Fragment>
    );
};

const ButtonBox = styled.button`
    margin-top: 33px;
    width: 344px;
    height: 46px;
    border-radius: 50px;
    ${mixin.textProps(20, "extraBold", "white")}
    background-color : ${({ theme }) => theme.color.mainBlue};
    box-shadow: 0px 1px 1px 1px #ececec;
`;
const KakaoButtonBox = styled.button`
    margin-top: 15px;
    width: 344px;
    height: 46px;
    border-radius: 50px;
    ${mixin.textProps(20, "extraBold")}
    background-color : #FEE500;
    box-shadow: 0px 1px 1px 1px #ececec;
`;
const FBButtonBox = styled.button`
    margin-top: 15px;
    width: 344px;
    height: 46px;
    border-radius: 50px;
    ${mixin.textProps(20, "extraBold", "white")};
    background-color: #3b5998;
    box-shadow: 0px 1px 1px 1px #ececec;
`;
const GoogleButtonBox = styled.button`
    margin-top: 15px;
    width: 344px;
    height: 46px;
    border-radius: 50px;
    ${mixin.textProps(20, "extraBold")};
    background-color: ${({ theme }) => theme.color.white};
    box-shadow: 0px 1px 1px 1px #ececec;
`;
const MemberCheckBox = styled.div`
    margin-top: 27px;
    display: flex;
`;
const DoYouHaveID = styled.p`
    ${mixin.textProps(20, "semiBold", "gray3")}
`;
const GoSignUp = styled.button`
    background-color: ${({ theme }) => theme.color.white};
    ${mixin.textProps(20, "semiBold", "mainBlue")}
`;

export default SocialLogin;
