import React from "react";
import styled from "styled-components";
import mixin from "../../styles/Mixin";

const CandidateIntroBox = ({ candidates, idx }) => {
    return (
        <Container>
            <CandidateImage>
                <img
                    src={
                        candidates[idx]?.photo
                            ? `http://3.36.90.60/${candidates[idx].photo}`
                            : "https://cdn.pixabay.com/photo/2016/04/01/12/07/alien-1300540__340.png"
                    }
                    alt={candidates[idx]?.name}
                />
            </CandidateImage>
            <CandidateInfo>
                <CandidateName>
                    <strong>
                        기호 {idx + 1}번 {""}
                        {candidates[idx]?.name}
                    </strong>
                </CandidateName>
                <CandidateIntro>
                    <span>학과</span>
                    <p>{candidates[idx]?.major}</p>
                    <span>소개</span>
                    <p>{candidates[idx]?.content}</p>
                </CandidateIntro>
            </CandidateInfo>
        </Container>
    );
};

const Container = styled.div`
    ${mixin.flexBox("center", "center", null, "400px")};
    ${mixin.outline("4px solid", "blue2")}
    border-radius: 200px;
    padding: 70px 0;
    margin: 40px 0 80px 0;
`;

const CandidateImage = styled.div`
    height: 210px;
    width: 210px;
    margin-right: 30px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        ${mixin.boxShadow()}
    }
`;

const CandidateInfo = styled.div`
    height: 100%;
    width: 550px;
`;

const CandidateName = styled.div`
    margin-bottom: 30px;
    strong {
        ${mixin.textProps(30, "extraBold", "black")}
    }
`;
const CandidateIntro = styled.div`
    display: grid;
    grid-template-columns: 50px 1fr;
    gap: 10px;
    align-items: center;
    ${mixin.textProps(20, "regular", "gray1")}

    span {
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    }
`;

export default CandidateIntroBox;
