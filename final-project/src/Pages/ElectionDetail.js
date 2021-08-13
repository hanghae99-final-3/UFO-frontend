import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { history } from "../redux/configureStore";
import moment from "moment";
import confirm from "../confirm";

//통신
import { getElectionDB, deleteElectionDB } from "../redux/async/election";
import { voteApi } from "../api";

//컴포넌트
import ElectionSlider from "../Components/ElectionSlider";
import Message from "../Components/Message";

const ElectionDetail = () => {
    const dispatch = useDispatch();
    const { id: electionId } = useParams();
    const user = useSelector(state => state.user.user);
    const post = useSelector(state => state.election.post); //선거게시물의 데이터가 들어있습니다.
    const [selectCandidateNum, setSelectCandidateNum] = useState(null); //선택한 후보자의 번호를 담는 state입니다.

    useEffect(() => {
        dispatch(getElectionDB(electionId));
    }, []);

    const addVote = () => {
        //투표를 처리하는 함수입니다.
        const req = {
            election_id: electionId,
            candidate_id: selectCandidateNum,
        };

        voteApi.addVote(req).then(res => {
            if (res.data.ok) {
                alert("투표해주셔서 감사합니다!");
                history.replace("/election");
            } else {
                alert("투표가 정상적으로 처리되지 않았습니다!");
                history.replace("/election");
            }
        });
    };

    const deleteElection = () => {
        //선거를 삭제하는 함수입니다.
        confirm.deleteConfirm(() => {
            const req = {
                election_id: electionId,
            };
            dispatch(deleteElectionDB(req));
        });
    };

    //대학 인증을 한 사람만 볼 수 있도록 예외처리를 합니다.
    if (!user.univ_id || !user.country_id)
        return (
            <Message
                message="대학인증을 한 사람만 선거게시글을 볼 수 있어요"
                link="/mypage"
                buttonValue="대학인증하러가기"
            />
        );

    // 선거 종료일이 현재보다 뒤에 있다면 결과페이지로 연결하는 버튼을 보여줍니다.
    if (moment().isAfter(post?.end_date))
        return (
            <Message
                message="선거가 끝났어요! 결과를 보러 가시겠어요?"
                buttonValue="결과보러가기"
                link={`election/${electionId}/result`}
            />
        );

    return (
        <ElectionDetailContainer>
            <Title>투표함</Title>
            <TimeContainer>
                <h5>투표까지 남은 시간</h5>
                <TimeBox>
                    <span>D-일:시간:분</span>
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
                            <VoteCard
                                key={ele.candidate_id}
                                onClick={() =>
                                    setSelectCandidateNum(ele.candidate_id)
                                }
                                isSelected={
                                    ele.candidate_id === selectCandidateNum
                                }
                            >
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
    position: relative;

    > div:not(:last-child) {
        width: 100%;
        margin-top: 30px;
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
    border: 5px solid ${props => (props.isSelected ? "#eb4d4b" : "#d2d2d2")};
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
        padding: 10px 20px;
        border-radius: 10px;
        font-size: 20px;
        font-weight: bold;
        :first-child {
            margin-right: 10px;
        }
        :hover {
            background-color: #eb4d4b;
            color: #fff;
        }
    }
`;

const Result = styled.div`
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.9);
    overflow: hidden;
    touch-action: none;
    z-index: 99;
    text-align: center;
    button {
        margin-top: 200px;
        padding: 10px 20px;
        border-radius: 10px;
        font-size: 20px;
        font-weight: bold;
        :first-child {
            margin-right: 10px;
        }
        :hover {
            background-color: #eb4d4b;
            color: #fff;
        }
    }
`;

export default ElectionDetail;
