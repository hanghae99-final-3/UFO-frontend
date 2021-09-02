import React from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import theme from "../../Styles/theme";

// selectCandidate는 유저가 투표를 할때, 후보자를 클릭하면 후보자의 id값을 넘겨주는 함수입니다.
// getCandidateIdx는 유저가 후보자의 정보를 보고 싶어서 카드를 클릭했을때 idx값을 넘겨주는 함수입니다.
// isVote는 CandidateCard가 투표에 사용되는지 아닌지에 대한 판별값입니다. 투표에 사용되면 selectCandidate함수를 사용합니다.
// isSelected는 투표시에 유저가 후보자를 클릭했는지 안했는지에 대한 판별값입니다. 클릭하면 박스쉐도우를 입힙니다.
// cursor는 카드에 마우스를 올리면 포인터가 필요한지 아닌지에 대한 판별값입니다.

const CandidateCard = ({
    isDarkTheme,
    candidate,
    idx,
    getCandidateIdx,
    selectCandidate,
    isVote,
    isContact,
    isSelected,
    cursor,
    isVoteCard, //모바일때 투표용카드는 사이즈가 작아져서 사용하는 props 입니다.
    isTest, //체험용선거이면 true, 아니면 false입니다. true면 로컬에 있는 체험용 사진을 사용할 것입니다.
}) => {
    const voteProps = { isVote, isSelected, isVoteCard, isDarkTheme };
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
                isVoteCard={isVoteCard}
                src={
                    isTest
                        ? candidate.photo
                        : process.env.REACT_APP_API_URL + candidate.photo
                }
                alt={candidate.name}
            />

            <CandidateName isDarkTheme={isDarkTheme} isVoteCard={isVoteCard}>
                <span>{candidate.name}</span>
            </CandidateName>
        </Container>
    );
};

const Container = styled.div`
    width: ${({ theme }) => theme.calRem(210)};
    height: ${({ theme }) => theme.calRem(300)};
    border-radius: 25px;
    ${props => (props.isDarkTheme ? mixin.darkBoxShadow() : mixin.boxShadow())};
    ${props =>
        props.isVote &&
        props.isSelected &&
        mixin.boxShadow("0", "0", "2px", "5px", "#83ffca")};
    ${props => props.cursor && `cursor:pointer;`};

    @media ${({ theme }) => theme.mobile} {
        width: ${props =>
            props.isVoteCard ? `${theme.calRem(110)}` : `${theme.calRem(140)}`};
        height: ${props =>
            props.isVoteCard ? `${theme.calRem(160)}` : `${theme.calRem(200)}`};
    }
`;

const CandidateImage = styled.img`
    width: 100%;
    height: ${({ theme }) => theme.calRem(250)};
    object-fit: cover;
    border-radius: 25px 25px 0 0;
    @media ${({ theme }) => theme.mobile} {
        height: ${props =>
            props.isVoteCard ? `${theme.calRem(130)}` : `${theme.calRem(160)}`};
    }
`;
const CandidateName = styled.div`
    width: 100%;
    ${mixin.flexBox("center", "center", null, `${theme.calRem(44)}`)}
    background: ${props =>
        props.isDarkTheme ? props.theme.color.gray1 : props.theme.color.white};
    text-align: center;
    border-radius: 0 0 25px 25px;
    @media ${({ theme }) => theme.mobile} {
        height: ${props =>
            props.isVoteCard ? `${theme.calRem(24)}` : `${theme.calRem(34)}`};
    }
    span {
        line-height: 1;
        ${props =>
            mixin.textProps(
                18,
                "semiBold",
                props.isDarkTheme ? "white" : "gray2",
            )}
        @media ${({ theme }) => theme.mobile} {
            ${props =>
                mixin.textProps(
                    12,
                    "semiBold",
                    props.isDarkTheme ? "white" : "gray2",
                )}
        }
    }
`;

export default CandidateCard;
