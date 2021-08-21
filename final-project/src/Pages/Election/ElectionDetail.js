import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { history } from "../../redux/configureStore";
import moment from "moment";
import confirm from "../../confirm";
import mixin from "../../styles/Mixin";
import Swal from "sweetalert2";

//통신
import {
    getElectionDB,
    getElectionListDB,
    deleteElectionDB,
    addVoteDB,
} from "../../redux/async/election";

//컴포넌트
import CandidateSlider from "../../Components/Election/CandidateSlider";
import Message from "../../Components/Message";
import DefaultButton from "../../Elements/Buttons/DefaultButton";
import DangerButton from "../../Elements/Buttons/DangerButton";
import Count from "../../Components/CountDown/Count";
import ProgressBar from "../../Components/Election/ProgressBar";
import CandidateBox from "../../Components/Election/CandidateBox";
import CandidateCard from "../../Components/Election/CandidateCard";
import UnvotedBox from "../../Components/Election/UnvotedBox";

const ElectionDetail = () => {
    const dispatch = useDispatch();
    const { id: electionId } = useParams();
    const userInfo = useSelector(state => state.user.user);
    const isAdmin = useSelector(state => state.user.isAdmin); //관리자인지 아닌지에 대한 판별값
    const electionList = useSelector(state => state.election.list); // 모든 선거게시물의 리스트입니다.
    const post = useSelector(state => state.election.post); //선거게시물의 데이터가 들어있습니다.
    const [selectCandidateId, setSelectCandidateId] = useState(null); //선택한 후보자의 번호를 담는 state입니다.
    const unvotedElectionList = electionList.filter(
        post => post.votes.length < 1 && moment().isBefore(post.end_date),
    ); //미투표&&기간종료되지않은 투표리스트
    console.log(unvotedElectionList);

    useEffect(() => {
        dispatch(getElectionListDB());
        dispatch(getElectionDB(electionId));
    }, [electionId]);

    const selectCandidate = id => {
        //후보자를 선택하면 setSelectCandidateId에 후보자id를 저장합니다.
        setSelectCandidateId(id);
    };

    const addVote = () => {
        //투표를 처리하는 함수입니다.
        if (!selectCandidateId)
            return Swal.fire("에러", "후보자를 선택해주세요!", "error");

        const req = {
            election_id: electionId,
            candidate_id: selectCandidateId,
        };

        dispatch(addVoteDB(req));
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
            <UnvotedContainer>
                <Title>미완료 투표함</Title>
                <UnvotedBox list={unvotedElectionList} />
            </UnvotedContainer>
            <ElectionInfoContainer>
                <ElectionTitle>
                    <h5>{post?.name}</h5>
                    <TitleControls>
                        {/* 선거시작일이 현재보다 이전이거나 같지 않고, 관리자면 수정하기 버튼을 볼 수 있습니다.  */}
                        {moment().isBefore(post?.start_date) &&
                            !moment().isSame(post?.start_date) &&
                            isAdmin && (
                                <DangerButton
                                    rightGap="15px"
                                    onClick={() =>
                                        history.push(
                                            `/election/edit/${post.election_id}`,
                                        )
                                    }
                                >
                                    수정하기
                                </DangerButton>
                            )}
                        {/* 관리자면 삭제하기 버튼을 볼 수 있습니다. */}
                        {isAdmin && (
                            <DangerButton onClick={deleteElection}>
                                삭제하기
                            </DangerButton>
                        )}
                    </TitleControls>
                </ElectionTitle>
                <p>{post?.content}</p>
            </ElectionInfoContainer>
            <CountdownContainer>
                <Title>투표까지 남은 시간</Title>
                {/* 투표가 아직 시작 전이면 투표 시작 전 문구를 렌더링, 아니면 시간을 카운팅합니다. */}
                {moment().isBefore(post?.start_date) ||
                moment().isSame(post?.start_date) ? (
                    <BeforeElection>
                        <span>투표 시작 전</span>
                    </BeforeElection>
                ) : (
                    <Count deadline={post?.end_date && post.end_date} />
                )}
                <ProgressBar
                    start={post?.start_date && post.start_date}
                    end={post?.end_date && post.end_date}
                />
                <ElectionDate>
                    <span>{post?.start_date}</span>
                    <span>{post?.end_date}</span>
                </ElectionDate>
            </CountdownContainer>
            <CandidatesContainer>
                <Title>후보자</Title>
                {/* 후보자가 3명 이하면, CandidateBox를 렌더링, 아니면 CandidateSlider을 렌더링한다. */}
                {post && post.candidates.length <= 3 && (
                    <CandidateBox candidateList={post.candidates} />
                )}
                {post && post.candidates.length > 3 && (
                    <CandidateSlider candidateList={post && post.candidates} />
                )}
            </CandidatesContainer>
            <VoteContainer>
                <VoteTitle>
                    <h5>투표하기</h5>
                    <p>비밀 투표이며, 투표 완료시, 변경이 불가합니다.</p>
                </VoteTitle>
                <VoteBox>
                    {post &&
                        post.candidates.map((candidate, idx) => (
                            <CandidateCard
                                key={idx}
                                candidate={candidate}
                                selectCandidate={selectCandidate}
                                isVote
                                isSelected={
                                    selectCandidateId === candidate.candidate_id
                                }
                                cursor
                            />
                        ))}
                </VoteBox>
            </VoteContainer>
            <Controls>
                <DefaultButton rightGap="15px" onClick={addVote}>
                    투표하기
                </DefaultButton>
            </Controls>
        </ElectionDetailContainer>
    );
};

const ElectionDetailContainer = styled.div`
    width: 100%;
    position: relative;
`;

const UnvotedContainer = styled.div`
    width: 100%;
`;

const Title = styled.h5`
    ${mixin.textProps(30, "extraBold", "black")};
    ${props =>
        !props.borderNone && mixin.outline("1px solid", "gray4", "bottom")}
    padding-bottom: 10px;
    margin-bottom: 15px;
`;

const ElectionInfoContainer = styled.div`
    margin-bottom: 70px;
`;

const ElectionTitle = styled.div`
    ${mixin.outline("1px solid", "gray4", "bottom")};
    ${mixin.flexBox("space-between", "flex-end")};
    padding-bottom: 10px;
    margin-bottom: 15px;
    h5 {
        ${mixin.textProps(30, "extraBold", "black")};
        line-height: 1;
    }

    p {
        ${mixin.textProps(20, "regular", "black")};
    }
`;

const TitleControls = styled.div``;

const CountdownContainer = styled.div`
    margin-bottom: 70px;
`;

const ElectionDate = styled.div`
    margin-top: 5px;
    ${mixin.flexBox("space-between", "flex-end")};
    span {
        ${mixin.textProps(20, "extraBold", "black")};
    }
`;

const BeforeElection = styled.div`
    text-align: center;
    > span {
        ${mixin.textProps(null, "extraBold", "gray3")}
        font-size: 100px;
    }
`;

const CandidatesContainer = styled.div`
    margin-bottom: 70px;
`;

const VoteContainer = styled.div`
    margin-bottom: 30px;
`;

const VoteTitle = styled.div`
    ${mixin.outline("1px solid", "gray4", "bottom")};
    ${mixin.flexBox("space-between", "flex-end")};
    padding-bottom: 10px;
    margin-bottom: 15px;

    h5 {
        ${mixin.textProps(30, "extraBold", "black")};
        line-height: 1;
    }
    p {
        ${mixin.textProps(14, "semiBold", "danger")}
    }
`;

const VoteBox = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    flex-wrap: wrap;
    gap: 10px;
`;

const Controls = styled.div`
    ${mixin.flexBox("center")}
`;

export default ElectionDetail;
