import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { history } from "../../redux/configureStore";
import moment from "moment";
import confirm from "../../confirm";
import mixin from "../../styles/Mixin";

//통신
import { getElectionDB, deleteElectionDB } from "../../redux/async/election";
import { voteApi } from "../../api";

//컴포넌트
import ElectionSlider from "../../Components/Election/ElectionSlider";
import Message from "../../Components/Message";
import DefaultButton from "../../Elements/Buttons/DefaultButton";
import Count from "../../Components/CountDown/Count";
import ProgressBar from "../../Components/Election/ProgressBar";

const ElectionDetail = () => {
    const dispatch = useDispatch();
    const { id: electionId } = useParams();
    const userInfo = useSelector(state => state.user.user);
    const isAdmin = useSelector(state => state.user.isAdmin); //관리자인지 아닌지에 대한 판별값
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
    if (!userInfo.univ_id || !userInfo.country_id)
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
            <ElectionContainer>
                <h5>투표함</h5>
                <ElectionBox></ElectionBox>
            </ElectionContainer>
            <CountdownContainer>
                <h5>투표까지 남은 시간</h5>
                <ProgressBar
                    start={post?.start_date && post.start_date}
                    end={post?.end_date && post.end_date}
                />
                <TimeBox>
                    <Count deadline={post?.end_date && post.end_date} />
                </TimeBox>
            </CountdownContainer>
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
                                    src={
                                        ele.photo
                                            ? `http://3.36.90.60/${ele.photo}`
                                            : "https://cdn.pixabay.com/photo/2016/04/01/12/07/alien-1300540__340.png"
                                    }
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
                <DefaultButton rightGap="15px" onClick={addVote}>
                    투표하기
                </DefaultButton>

                {/* 관리자면 삭제하기 버튼을 볼 수 있습니다. */}
                {isAdmin && (
                    <DefaultButton onClick={deleteElection}>
                        삭제하기
                    </DefaultButton>
                )}

                {/* 선거시작일이 현재보다 이전이거나 같지 않고, 관리자면 수정하기 버튼을 볼 수 있습니다.  */}
                {moment().isBefore(post?.start_date) &&
                    !moment().isSame(post?.start_date) &&
                    isAdmin(
                        <DefaultButton
                            leftGap="15px"
                            onClick={() =>
                                history.push(
                                    `/election/edit/${post.election_id}`,
                                )
                            }
                        >
                            수정하기
                        </DefaultButton>,
                    )}
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
const ElectionContainer = styled.div`
    width: 100%;
    h5 {
        ${mixin.textProps(30, "extraBold", "black")};
        ${mixin.outline("1px solid", "gray4", "bottom")};
        padding-bottom: 10px;
    }
`;

const ElectionBox = styled.div`
    padding: 15px 0;
`;

const CountdownContainer = styled.div`
    h5 {
        ${mixin.textProps(30, "extraBold", "black")};
        ${mixin.outline("1px solid", "gray4", "bottom")};
        padding-bottom: 10px;
    }
`;
const TimeBox = styled.div`
    width: 100%;
    text-align: center;
    padding: 30px;
    border: 1px solid #707070;
    background: #d9d9d9;
    p {
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
