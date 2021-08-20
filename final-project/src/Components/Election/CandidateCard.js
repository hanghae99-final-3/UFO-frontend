import React, { useState } from "react";
import styled from "styled-components";
import mixin from "../../styles/Mixin";

// selectCandidate는 유저가 투표를 할때, 후보자를 클릭하면 후보자의 id값을 넘겨주는 함수입니다.
// getCandidateIdx는 유저가 후보자의 정보를 보고 싶어서 카드를 클릭했을때 idx값을 넘겨주는 함수입니다.
// isVote는 CandidateCard가 투표에 사용되는지 아닌지에 대한 판별값입니다. 투표에 사용되면 selectCandidate함수를 사용합니다.
// isSelected는 투표시에 유저가 후보자를 클릭했는지 안했는지에 대한 판별값입니다. 클릭하면 박스쉐도우를 입힙니다.
// cursor는 카드에 마우스를 올리면 포인터가 필요한지 아닌지에 대한 판별값입니다.

const CandidateCard = ({
    candidate,
    idx,
    getCandidateIdx,
    selectCandidate,
    isVote,
    isContact,
    isSelected,
    cursor,
}) => {
    const voteProps = { isVote, isSelected };

    return (
        <Container
            {...voteProps}
            cursor={cursor ? "true" : false}
            onClick={() => {
                if (isVote) return selectCandidate(candidate.candidate_id);
                if (isContact) return getCandidateIdx(idx);
            }}
        >
            <CandidateImage
                src={`http://3.36.90.60/${candidate.photo}`}
                alt={candidate.name}
            />
            <CandidateName>
                <span>{candidate.name}</span>
            </CandidateName>
        </Container>
    );
};

const Container = styled.div`
    height: 300px;
    width: 210px;
    border-radius: 25px;
    ${mixin.boxShadow()}
    ${props =>
        props.isVote &&
        props.isSelected &&
        mixin.boxShadow("0", "0", "2px", "5px", "#83ffca")};
    ${props => props.cursor && `cursor:pointer;`};
`;

const CandidateImage = styled.img`
    width: 100%;
    height: 83%;
    object-fit: cover;
    border-radius: 25px 25px 0 0;
`;
const CandidateName = styled.div`
    width: 100%;
    ${mixin.flexBox("center", "center", null, "16%")}
    background: ${({ theme }) => theme.color.white};
    text-align: center;
    border-radius: 0 0 25px 25px;
    span {
        line-height: 1;
        ${mixin.textProps(18, "semiBold", "gray2")}
    }
`;

export default CandidateCard;
