import React, { useState } from "react";
import styled from "styled-components";
import mixin from "../../styles/Mixin";
import CandidateCard from "./CandidateCard";

const CandidateBox = ({ candidateList }) => {
    const [candidateIdx, setCandidateIdx] = useState(0); //상세페이지에서 보여줄 후보자의 id값
    const getCandidateIdx = idx => {
        setCandidateIdx(idx);
    };
    return (
        <CandidateBoxContainer>
            <CandidateCardBox>
                {candidateList &&
                    candidateList.map((candidate, idx) => (
                        <CandidateCard
                            candidate={candidate}
                            key={idx}
                            idx={idx}
                            cursor
                            getCandidateIdx={getCandidateIdx}
                        />
                    ))}
            </CandidateCardBox>
            <CandidateDetailBox>
                <CandidateImage>
                    <img
                        src={
                            candidateList[candidateIdx]?.photo
                                ? `http://3.36.90.60/${candidateList[candidateIdx].photo}`
                                : "https://cdn.pixabay.com/photo/2016/04/01/12/07/alien-1300540__340.png"
                        }
                        alt={candidateList[candidateIdx]?.name}
                    />
                </CandidateImage>
                <CandidateInfo>
                    <CandidateName>
                        <strong>
                            기호 {candidateIdx + 1}번 {""}
                            {candidateList[candidateIdx]?.name}
                        </strong>
                    </CandidateName>
                    <CandidateIntro>
                        <span>학과</span>
                        <p>{candidateList[candidateIdx]?.major}</p>
                        <span>소개</span>
                        <p>{candidateList[candidateIdx]?.content}</p>
                    </CandidateIntro>
                </CandidateInfo>
            </CandidateDetailBox>
        </CandidateBoxContainer>
    );
};

const CandidateBoxContainer = styled.div``;
const CandidateCardBox = styled.div`
    ${mixin.flexBox("space-evenly")}
`;
const CandidateDetailBox = styled.div`
    ${mixin.flexBox("center", "center", null, "400px")};
    ${mixin.outline("4px solid", "blue2")}
    border-radius: 200px;
    padding: 70px 0;
    margin: 40px 0 80px 0;
`;

const CandidateImage = styled.div`
    height: 100%;
    margin-right: 30px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 20px;
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
    ${mixin.textProps(20, "regular", "gray1")}

    span {
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    }
`;

export default CandidateBox;
