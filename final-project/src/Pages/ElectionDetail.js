import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getElectionDB, deleteElectionDB } from "../redux/async/election";

//컴포넌트
import ElectionSlider from "../Components/ElectionSlider";

const ElectionDetail = () => {
    const dispatch = useDispatch();
    const { id: electionId } = useParams();
    const post = useSelector(state => state.election.post); //선거게시물의 데이터가 들어있습니다.
    const [focusCardId, setFocusCardId] = useState(null); // 현재 보여지고 있는 후보자 카드의 Id의 정보를 담고있는 state
    const [isShowCard, setIsShowCard] = useState(false); //후보자 카드가 보여지고 있나 없나 판별 state

    useEffect(() => {
        dispatch(getElectionDB(electionId));
    }, []);

    const addVote = () => {
        //투표를 처리하는 함수입니다.
    };

    const deleteElection = () => {
        //선거를 삭제하는 함수입니다.
        const req = {
            election_id: electionId,
        };

        dispatch(deleteElectionDB(req));
    };

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
                <CandidatesBox>
                    {post && (
                        <ElectionSlider
                            candidateList={post && post.candidates}
                        />
                    )}
                </CandidatesBox>
            </CandidatesContainer>
            <VoteContainer>
                <h5>투표하기</h5>
                <p>비밀 투표이며, 투표 완료시, 변경이 불가합니다.</p>
                <VoteBox>
                    {post &&
                        post.candidates.map((ele, idx) => (
                            <VoteCard key={ele.candidate_id}>
                                <img
                                    src={`http://3.36.90.60/${ele.photo}`}
                                    alt={ele.photo}
                                />
                                <p>
                                    <span>기호 {idx + 1}번</span> {ele.name}
                                </p>
                            </VoteCard>
                        ))}
                </VoteBox>
            </VoteContainer>
            <Controls>
                <button onClick={addVote}>투표하기</button>
                <button onClick={deleteElection}>삭제하기</button>
            </Controls>
        </ElectionDetailContainer>
    );
};

const ElectionDetailContainer = styled.div`
    width: 100%;

    > div {
        width: 100%;
        margin-top: 30px;
        :not(:nth-child(2)) {
            margin-top: 50px;
        }
        h5 {
            color: #707070;
            font-size: 25px;
            margin-bottom: 10px;
        }
    }
`;
const Title = styled.h3`
    width: 100%;
    font-size: 30px;
`;

const TimeContainer = styled.div``;
const TimeBox = styled.div`
    width: 100%;
    text-align: center;
    padding: 30px;
    border: 1px solid #707070;
    background: #d9d9d9;
    span {
        font-size: 50px;
        font-weight: bold;
        color: #707070;
    }
`;
const CandidatesContainer = styled.div``;
const CandidatesBox = styled.div``;

const VoteContainer = styled.div`
    > p {
        color: #eb4d4b;
    }
`;

const VoteBox = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    flex-wrap: wrap;
`;

const VoteCard = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #d2d2d2;
    text-align: center;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    p {
        span {
            font-weight: bold;
        }
    }
`;

const Controls = styled.div`
    text-align: center;
    button {
        padding: 10px;
    }
`;

export default ElectionDetail;
