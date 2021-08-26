import React from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import theme from "../../Styles/theme";

const CandidateIntroBox = ({ candidates, idx }) => {
    const isDesktop =
        document.documentElement.clientWidth >= 1080 ? true : false;
    return (
        <Container>
            <Top>
                <CandidateImage
                    src={
                        candidates[idx]?.photo
                            ? `https://yzkim9501.site/${candidates[idx].photo}`
                            : "https://cdn.pixabay.com/photo/2016/04/01/12/07/alien-1300540__340.png"
                    }
                    alt={candidates[idx]?.name}
                />
                <CandidateInfo>
                    <CandidateName>
                        {isDesktop ? (
                            <strong>
                                기호 {idx + 1}번 {""}
                                {candidates[idx]?.name}
                            </strong>
                        ) : (
                            <>
                                <strong>
                                    기호 {idx + 1}번 {""}
                                </strong>
                                <span>{candidates[idx]?.name}</span>
                            </>
                        )}
                    </CandidateName>
                    <CandidateIntro>
                        <p>{candidates[idx]?.major}</p>
                        {isDesktop && <p>{candidates[idx]?.content}</p>}
                    </CandidateIntro>
                </CandidateInfo>
            </Top>
            {!isDesktop && (
                <Bottom>
                    <p>{candidates[idx]?.content}</p>
                </Bottom>
            )}
        </Container>
    );
};

const Container = styled.div`
    margin-top: ${({ theme }) => theme.calRem(40)};
    padding: ${({ theme }) => `${theme.calRem(70)} ${theme.calRem(140)}`};
    border-radius: 200px;
    ${mixin.outline("4px solid", "blue2")}
    @media ${({ theme }) => theme.mobile} {
        padding: ${({ theme }) => theme.calRem(32)};
        margin-top: ${({ theme }) => theme.calRem(16)};
        border-radius: 50px;
    }
`;

const Top = styled.div`
    ${mixin.flexBox("center", null, null, null)};
    min-height: ${theme.calRem(210)};
    @media ${({ theme }) => theme.mobile} {
        min-height: ${({ theme }) => theme.calRem(100)};
    }
`;

const CandidateImage = styled.img`
    height: ${({ theme }) => theme.calRem(210)};
    width: ${({ theme }) => theme.calRem(210)};
    object-fit: cover;
    margin-right: ${({ theme }) => theme.calRem(30)};
    border-radius: 50%;
    ${mixin.boxShadow()}
    @media ${({ theme }) => theme.mobile} {
        width: ${({ theme }) => theme.calRem(100)};
        height: ${({ theme }) => theme.calRem(100)};
        margin-right: ${({ theme }) => theme.calRem(16)};
    }
`;

const CandidateInfo = styled.div`
    height: 100%;
    width: 100%;
`;

const CandidateName = styled.div`
    margin-bottom: ${({ theme }) => theme.calRem(30)};
    @media ${({ theme }) => theme.mobile} {
        margin-bottom: ${({ theme }) => theme.calRem(16)};
    }
    strong {
        ${mixin.textProps(30, "extraBold", "black")}
        @media ${({ theme }) => theme.mobile} {
            display: inline-block;
            width: 100%;
            ${mixin.textProps(22, "extraBold", "black")}
            margin-bottom: ${({ theme }) => theme.calRem(8)};
        }
    }
    span {
        ${mixin.textProps(22, "extraBold", "black")}
    }
`;
const CandidateIntro = styled.div`
    ${mixin.textProps(20, "regular", "gray1")}
    @media ${({ theme }) => theme.mobile} {
        ${mixin.textProps(16, "regular", "gray1")}
    }
    span {
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    }
`;

const Bottom = styled.div`
    //Bottom은 데스크탑이 아닐때에만 나타나는 컴포넌트입니다.
    margin-top: ${({ theme }) => theme.calRem(16)};
    padding-bottom: ${({ theme }) => theme.calRem(32)};
    p {
        ${mixin.textProps(16, "regular", "black")}
    }
`;

export default CandidateIntroBox;
