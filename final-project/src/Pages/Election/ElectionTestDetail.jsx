import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import mixin from "../../Styles/Mixin";
import theme from "../../Styles/theme";

//통신
import { voteApi } from "../../Shared/api";

//아이콘
import { GrEdit } from "react-icons/gr";

//alert
import Swal from "sweetalert2";

//컴포넌트
import DefaultButton from "../../Elements/Buttons/DefaultButton";
import DangerButton from "../../Elements/Buttons/DangerButton";
import Count from "../../Components/CountDown/Count";
import ProgressBar from "../../Components/Election/ProgressBar";
import CandidateBox from "../../Components/Election/CandidateBox";
import CandidateCard from "../../Components/Election/CandidateCard";
import UnvotedBox from "../../Components/Election/UnvotedBox";
import ElectedCard from "../../Components/Election/ElectedCard";
import CongratulationMessageBox from "../../Components/Election/CongratulationMessageBox";

//체험용 더미데이터
const post = {
    election_id: "",
    country_id: 2,
    univ_id: 9,
    name: "체험용 선거",
    content:
        "2021년 2학기 회장 선거를 개최합니다! 가장 아름다운 후보자에게 투표하세요! :-) ",
    start_date: "2021-09-01 16:15:00",
    end_date: "2022-09-08 16:15:00",
    createdAt: "2021-09-01 16:05:16",
    updatedAt: "2021-09-01 16:05:16",
    university: {
        name: "",
    },
    country: {
        name: "",
    },
    candidates: [
        {
            candidate_id: 1,
            election_id: 11,
            name: "아이유",
            major: "좋은날연구학과",
            content:
                "안녕하세요. 2021년 2학기 후보 아이유입니다. 누구보다도 가까이서 여러분의 이야기를 들으며 편리한 대학 생활이 되도록 열심히 발로 뛰겠습니다. 여러분을 돕는 학생회장이 되도록 노력하겠습니다.",
            photo: require("../../Assets/TestImage/아이유.jpg").default,
            createdAt: "2021-09-01 16:05:16",
            updatedAt: "2021-09-01 16:05:16",
        },
        {
            candidate_id: 2,
            election_id: 11,
            name: "카리나",
            major: "광야학과",
            content:
                "안녕하세요. 2021년 2학기 후보 카리나입니다. 누구보다도 가까이서 여러분의 이야기를 들으며 편리한 대학 생활이 되도록 열심히 발로 뛰겠습니다. 여러분을 돕는 학생회장이 되도록 노력하겠습니다.",
            photo: require("../../Assets/TestImage/카리나.jpg").default,
            createdAt: "2021-09-01 16:05:16",
            updatedAt: "2021-09-01 16:05:16",
        },
    ],
    votes: [],
};

const ElectionTestDetail = () => {
    const isDarkTheme = useSelector(state => state.user.isDarkTheme); //다크모드인지 아닌지 판별 state
    const [selectCandidateId, setSelectCandidateId] = useState(null); //유저가 선택한 후보자의 번호를 담는 state입니다.
    const isSampleLikeUnlikeSuccess =
        useSelector(state => state.user.user.sample_vote_id) !== 0
            ? true
            : false; //유저가 이미 샘플투표(사용팁이 좋았는지 싫었는지)를 했는지 안했는지에 대한 판별값입니다.
    const [isVoted, setIsVoted] = useState(false); //유저가 투표를 했는지 안했는지 판별state
    const [testResult, setTestResult] = useState(null); //체험용 당선자의 정보가 들어있는 state

    //데스크탑 사이즈인지 아닌지에 대한 판별값입니다.
    const isDesktop =
        document.documentElement.clientWidth >= 1080 ? true : false;

    const selectCandidate = id => {
        //후보자를 선택하면 setSelectCandidateId에 후보자id를 저장합니다.
        setSelectCandidateId(id);
    };

    const addVote = () => {
        //투표를 처리하는 함수입니다.
        if (isSampleLikeUnlikeSuccess) {
            //이미 샘플투표를 완료한 사람은 서버요청을 할 수 없게 막는다.
            return Swal.fire("에러", "이미 샘플투표를 완료했어요!", "error");
        }
        if (!selectCandidateId)
            return Swal.fire("에러", "후보자를 선택해주세요!", "error");
        setIsVoted(true);
        Swal.fire("완료", "투표가 완료되었습니다!", "success");
        setTestResult(
            post.candidates.filter(
                ele => selectCandidateId === ele.candidate_id,
            ),
        );
    };

    const forAdminControl = value => {
        //관리자용 버튼을 누르면 유저에게 알림을 띄웁니다.
        Swal.fire("잠깐!", `관리자만 ${value}할 수 있어요!`, "error");
    };

    const addLikeUnlike = value => {
        //서버에게 사용팁 후기를 넘겨준다. (1이면 like, 2면 unlike)

        if (value === "like") {
            const req = {
                vote_num: 1,
            };
            voteApi.addLikeUnlike(req).then(res => console.log(res));
        }
        if (value === "unlike") {
            const req = {
                vote_num: 2,
            };
            voteApi.addLikeUnlike(req).then(res => console.log(res));
        }
    };

    return (
        <ElectionTestDetailContainer>
            <UnvotedContainer>
                {/* 현재 진행중이지만, 투표를 하지 않은 게시글을 보여줍니다. */}
                <Title isDarkTheme={isDarkTheme}>
                    선택을 기다리는 투표함이 있어요
                </Title>
                <UnvotedBox isDarkTheme={isDarkTheme} list={[post]} isTest />
            </UnvotedContainer>
            <ElectionInfoContainer isDarkTheme={isDarkTheme}>
                {/* 선거 제목 */}
                <ElectionTitle isDarkTheme={isDarkTheme}>
                    <h5>{post.name}</h5>

                    <TitleControls>
                        {/* 데스크탑인 경우, 상세페이지 컨트롤 부분 */}
                        {isDesktop ? (
                            <>
                                <DangerButton
                                    rightGap={theme.calRem(8)}
                                    onClick={() => forAdminControl("수정")}
                                >
                                    수정하기
                                </DangerButton>

                                {/* 관리자면 삭제하기 버튼을 볼 수 있습니다. */}

                                <DangerButton
                                    onClick={() => forAdminControl("삭제")}
                                >
                                    삭제하기
                                </DangerButton>
                            </>
                        ) : (
                            //모바일인 경우, 상세페이지 컨트롤 부분
                            <DangerButton
                                onClick={() => forAdminControl("관리")}
                            >
                                <GrEdit />
                            </DangerButton>
                        )}
                    </TitleControls>
                </ElectionTitle>
                {/* 선거 내용 */}
                <p>{post.content}</p>
            </ElectionInfoContainer>

            {/* 카운트다운 */}
            <CountdownContainer>
                <Title isDarkTheme={isDarkTheme}>투표까지 남은 시간</Title>
                {/* 투표진행기간이면 카운트다운을 실행시키고, 진행전이면 투표 시작 전 문구를 렌더링, 끝났으면 투표 종료 문구를 렌더링합니다. */}
                <TimeBox isCountdown={true}>
                    <Count deadline={post.end_date && post.end_date} />
                </TimeBox>
                {/* 선거 진행 바 */}
                <ProgressBar
                    start={post.start_date && post.start_date}
                    end={post.end_date && post.end_date}
                />
                {/* 선거 일정 */}
                <ElectionDate isDarkTheme={isDarkTheme}>
                    <span>{post.start_date}</span>
                    <span>{post.end_date}</span>
                </ElectionDate>
            </CountdownContainer>
            {/* 후보자 정보 */}
            <CandidatesContainer>
                <Title isDarkTheme={isDarkTheme}>후보자</Title>
                <CandidateBox
                    isDarkTheme={isDarkTheme}
                    candidateList={post.candidates}
                    isTest
                />
            </CandidatesContainer>
            {/* 체험용 투표를 안했으면 투표를 보여주고, 했으면 결과를 보여줍니다. */}
            {!isVoted ? (
                <>
                    {/* 투표 보여주기 */}
                    <VoteContainer>
                        <VoteTitle isDarkTheme={isDarkTheme}>
                            <h5>투표하기</h5>
                            <p>
                                비밀 투표이며, 투표 완료시, 변경이 불가합니다.
                            </p>
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
                                            selectCandidateId ===
                                            candidate.candidate_id
                                        }
                                        isDarkTheme={isDarkTheme}
                                        cursor
                                        isVoteCard
                                        isTest
                                    />
                                ))}
                        </VoteBox>
                    </VoteContainer>
                    <Controls>
                        <DefaultButton
                            rightGap={theme.calRem(8)}
                            onClick={addVote}
                        >
                            제출하기
                        </DefaultButton>
                    </Controls>
                </>
            ) : (
                // 투표 결과 보여주기
                <ElectedContainer>
                    <Title isDarkTheme={isDarkTheme}>당선자</Title>
                    <ElectedCard
                        candidates={post.candidates}
                        testResult={testResult}
                    />
                    {/* 데스크탑이 아니면 축하메세지댓글을 밖으로 빼서 보여준다. */}
                    {!isDesktop && <CongratulationMessageBox isTest />}
                    {isVoted && (
                        <Controls>
                            <DefaultButton
                                rightGap={theme.calRem(8)}
                                onClick={() => addLikeUnlike("like")}
                            >
                                좋아요
                            </DefaultButton>
                            <DefaultButton
                                onClick={() => addLikeUnlike("unlike")}
                            >
                                싫어요
                            </DefaultButton>
                        </Controls>
                    )}
                </ElectedContainer>
            )}
        </ElectionTestDetailContainer>
    );
};

const ElectionTestDetailContainer = styled.div`
    width: 100%;
    position: relative;
`;

const UnvotedContainer = styled.div`
    width: 100%;
    margin-bottom: ${({ theme }) => theme.calRem(80)};
    @media ${({ theme }) => theme.mobile} {
        margin-bottom: ${({ theme }) => theme.calRem(48)};
    }
`;

const Title = styled.h5`
    ${props =>
        mixin.textProps(
            30,
            "extraBold",
            props.isDarkTheme ? "white" : "black",
        )};
    ${props =>
        !props.borderNone &&
        mixin.outline(
            "1px solid",
            props.isDarkTheme ? "gray1" : "gray4",
            "bottom",
        )}
    padding-bottom: ${({ theme }) => theme.calRem(10)};
    margin-bottom: ${({ theme }) => theme.calRem(15)};

    @media ${({ theme }) => theme.mobile} {
        padding-bottom: ${({ theme }) => theme.calRem(8)};
        margin-bottom: ${({ theme }) => theme.calRem(16)};
        ${props =>
            mixin.textProps(
                22,
                "extraBold",
                props.isDarkTheme ? "white" : "black",
            )};
    }
`;

const ElectionInfoContainer = styled.div`
    margin-bottom: ${({ theme }) => theme.calRem(80)};
    @media ${({ theme }) => theme.mobile} {
        margin-bottom: ${({ theme }) => theme.calRem(48)};
    }
    p {
        ${props =>
            mixin.textProps(
                20,
                "regular",
                props.isDarkTheme ? "mainGray" : "black",
            )};
        @media ${({ theme }) => theme.mobile} {
            ${props =>
                mixin.textProps(
                    16,
                    "regular",
                    props.isDarkTheme ? "mainGray" : "black",
                )};
        }
    }
`;

const ElectionTitle = styled.div`
    ${props =>
        mixin.outline(
            "1px solid",
            props.isDarkTheme ? "gray1" : "gray4",
            "bottom",
        )};
    ${mixin.flexBox("space-between", "center")};
    padding-bottom: ${({ theme }) => theme.calRem(10)};
    margin-bottom: ${({ theme }) => theme.calRem(15)};
    @media ${({ theme }) => theme.mobile} {
        padding-bottom: ${({ theme }) => theme.calRem(8)};
        margin-bottom: ${({ theme }) => theme.calRem(16)};
    }

    h5 {
        ${props =>
            mixin.textProps(
                30,
                "extraBold",
                props.isDarkTheme ? "white" : "black",
            )};
        line-height: 1.5;
        @media ${({ theme }) => theme.mobile} {
            ${props =>
                mixin.textProps(
                    22,
                    "extraBold",
                    props.isDarkTheme ? "white" : "black",
                )};
        }
    }
`;

const TitleControls = styled.div`
    width: max-content;
`;

const CountdownContainer = styled.div`
    margin-bottom: ${({ theme }) => theme.calRem(80)};
    @media ${({ theme }) => theme.mobile} {
        margin-bottom: ${({ theme }) => theme.calRem(48)};
    }
`;

const TimeBox = styled.div`
    text-align: center;
    span {
        font-size: 100px;
        ${props =>
            props.isCountdown || props.isFinished
                ? mixin.textProps(null, "extraBold", "mainBlue")
                : mixin.textProps(null, "extraBold", "gray3")};

        @media ${({ theme }) => theme.mobile} {
            font-size: ${({ theme }) => theme.fontSize["40"]};
        }
    }
`;

const ElectionDate = styled.div`
    ${mixin.flexBox("space-between", "flex-end")};
    span {
        ${props =>
            mixin.textProps(
                20,
                "extraBold",
                props.isDarkTheme ? "white" : "black",
            )};

        @media ${({ theme }) => theme.mobile} {
            font-size: ${({ theme }) => theme.fontSize["14"]};
        }
    }
`;

const CandidatesContainer = styled.div`
    margin-bottom: ${({ theme }) => theme.calRem(80)};
    @media ${({ theme }) => theme.mobile} {
        margin-bottom: ${({ theme }) => theme.calRem(48)};
    }
`;

const VoteContainer = styled.div``;

const VoteTitle = styled.div`
    ${props =>
        mixin.outline(
            "1px solid",
            props.isDarkTheme ? "gray1" : "gray4",
            "bottom",
        )};
    ${mixin.flexBox("space-between", "flex-end")};
    padding-bottom: ${({ theme }) => theme.calRem(10)};
    margin-bottom: ${({ theme }) => theme.calRem(15)};
    @media ${({ theme }) => theme.mobile} {
        padding-bottom: ${({ theme }) => theme.calRem(8)};
        margin-bottom: ${({ theme }) => theme.calRem(16)};
    }

    h5 {
        ${props =>
            mixin.textProps(
                30,
                "extraBold",
                props.isDarkTheme ? "white" : "black",
            )};
        line-height: 1;
        @media ${({ theme }) => theme.mobile} {
            ${props =>
                mixin.textProps(
                    22,
                    "extraBold",
                    props.isDarkTheme ? "white" : "black",
                )};
        }
    }
    p {
        ${mixin.textProps(14, "semiBold", "danger")}
        @media ${({ theme }) => theme.mobile} {
            ${mixin.textProps(11, "semiBold", "danger")}
        }
    }
`;

const VoteBox = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.calRem(12)};

    @media ${({ theme }) => theme.mobile} {
        display: flex;
    }
`;

const Controls = styled.div`
    ${mixin.flexBox("center")}
    margin-top: ${({ theme }) => theme.calRem(30)};
    @media ${({ theme }) => theme.mobile} {
        margin-top: ${({ theme }) => theme.calRem(24)};
    }
`;

const ElectedContainer = styled.div``;

const ElectedTestContainer = styled.div`
    ${mixin.floatBox("relative")}
    background: ${({ theme }) => theme.color.mainBlue};
    min-height: 480px;
    border-radius: 25px;
`;

const NotElected = styled.div`
    ${mixin.floatBox("absolute", "50%", "50%")}
    transform: translate(50%,-50%);
    ${mixin.textProps(20, "regular", "white")}
`;
const ElectedBox = styled.div`
    ${mixin.flexBox("space-between")}
    padding: 15px;
    gap: 40px;
`;
const ElectedImage = styled.div`
    ${mixin.flexBox("center", "center", null, null)}
    ${mixin.textProps(20, "regular", "white")}
    width: 380px;
    img {
        width: 380px;
        height: 450px;
        object-fit: cover;
        border-radius: 25px;
    }
`;
const ElectedInfo = styled.div`
    width: 100%;
`;
const ElectedName = styled.h5`
    ${mixin.textProps(30, "extraBold", "white")}
    padding: 5px 0;
`;
const ElectedMajor = styled.p`
    ${mixin.textProps(20, "regular", "white")}
`;

export default ElectionTestDetail;
