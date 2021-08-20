import React, { useState } from "react";
import styled from "styled-components";
import mixin from "../../styles/Mixin";
import CandidateCard from "./CandidateCard";
import CandidateIntroBox from "./CandidateIntroBox";

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
                            isContact
                            getCandidateIdx={getCandidateIdx}
                        />
                    ))}
            </CandidateCardBox>
            <CandidateIntroBox candidates={candidateList} idx={candidateIdx} />
        </CandidateBoxContainer>
    );
};

const CandidateBoxContainer = styled.div``;
const CandidateCardBox = styled.div`
    ${mixin.flexBox("space-evenly")}
`;

export default CandidateBox;
