import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getElectionDB, deleteElectionDB } from "../redux/async/election";

const ElectionDetail = () => {
    const dispatch = useDispatch();
    const { id: electionId } = useParams();
    const post = useSelector(state => state.election.post); //선거게시물의 데이터가 들어있습니다.
    const [focusCardId, setFocusCardId] = useState(null); // 현재 보여지고 있는 후보자 카드의 Id의 정보를 담고있는 state
    const [isShowCard, setIsShowCard] = useState(false); //후보자 카드가 보여지고 있나 없나 판별 state

    useEffect(() => {
        dispatch(getElectionDB(electionId));
    }, []);

    const deletePost = () => {
        const req = {
            election_id: electionId,
        };

        dispatch(deleteElectionDB(req));
    };
    console.log(post);

    return (
        <ElectionDetailContainer>
            <Title>투표함</Title>
            <TimeContainer>
                <h5>투표까지 남은 시간</h5>
                <TimeBox>
                    <span>D-일수:시간:분</span>
                </TimeBox>
            </TimeContainer>
            <CandidatesContainer>
                <h5>후보자</h5>
                <CandidatesBox>스와이퍼들어갈곳</CandidatesBox>
            </CandidatesContainer>
            <VoteContainer>
                <h5>투표하기</h5>
                <p>비밀 투표이며, 투표 완료시, 변경이 불가합니다.</p>
                <VoteBox>
                    {post && post.candidates.map((ele,idx) => <VoteCard key={ele.candidate_id}>
                        <span>기호 {idx+1}번</span>
                        <img src={`http://3.36.90.60/${ele.photo}`} alt={ele.photo} />
                        <span>{ele.name}</span>
                        <p>{ele.content}</p>
                    </VoteCard>)}
                </VoteBox>
            </VoteContainer>
            <Button onClick={deletePost}>삭제하기</Button>
        </ElectionDetailContainer>
    );
};

const ElectionDetailContainer = styled.div`
    width: 100%;

    > div {
        width: 100%;
    }
`;
const Title = styled.h3`
    width: 100%;
`;

const TimeContainer = styled.div``;
const TimeBox = styled.div`
    width: 100%;
    text-align: center;
    span {
        font-size: 100px;
    }
`;
const CandidatesContainer = styled.div``;
const CandidatesBox = styled.div``;

const VoteContainer = styled.div`
>p{
    color:#eb4d4b;
}
`;

const VoteBox = styled.div`
display:flex;`;

const VoteCard = styled.div`
display:flex;
flex-direction: column;
border:1px solid #d2d2d2;
`;
const Button = styled.button`
    padding: 10px;
`;

export default ElectionDetail;
