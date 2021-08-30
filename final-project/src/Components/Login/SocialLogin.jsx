import React from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import { history } from "../../Redux/configureStore";
import Swal from "sweetalert2";

const SocialLogin = ({ toggleLoginMode }) => {
    return (
        <React.Fragment>
            <ButtonBox variant="outlined" onClick={toggleLoginMode}>
                이메일로 로그인
            </ButtonBox>
            <KakaoButtonBox
                variant="outlined"
                onClick={() => Swal.fire("서비스 준비중입니다!")}
            >
                <span href="https://yzkim9501.site/auth/kakao">
                    카카오 로그인
                </span>
            </KakaoButtonBox>
            <MemberCheckBox>
                <DoYouHaveID>UFO와 함께하실래요?</DoYouHaveID>
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

    @media ${({ theme }) => theme.mobile} {
        ${mixin.textProps(16, "extraBold", "white")}
        margin-top: 24px;
        width: 264px;
        height: 40px;
    }
`;
const KakaoButtonBox = styled.button`
    margin-top: 15px;
    width: 344px;
    height: 46px;
    border-radius: 50px;

    ${mixin.textProps(20, "extraBold", "white")}
    background-color: #fee500;
    box-shadow: 0px 1px 1px 1px #ececec;
    @media ${({ theme }) => theme.mobile} {
        ${mixin.textProps(16, "extraBold", "white")}
        width: 264px;
        height: 40px;
    }
`;

const MemberCheckBox = styled.div`
    width: 344px;
    justify-content: space-between;
    margin-top: 27px;
    display: flex;
    @media ${({ theme }) => theme.mobile} {
        width: 263px;
        margin-top: ${({ theme }) => theme.calRem(22)};
    }
`;
const DoYouHaveID = styled.p`
    ${mixin.textProps(20, "semiBold", "gray3")}
    @media ${({ theme }) => theme.mobile} {
        ${mixin.textProps(16, "semiBold", "gray3")}
    }
`;
const GoSignUp = styled.button`
    background-color: ${({ theme }) => theme.color.white};
    ${mixin.textProps(20, "semiBold", "mainBlue")}
    //모바일 사이즈
     @media ${({ theme }) => theme.mobile} {
        ${mixin.textProps(16, "semiBold", "mainBlue")}
    }
`;

export default SocialLogin;
