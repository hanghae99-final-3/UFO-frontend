import React, { useEffect } from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";

//통신
import { useSelector, useDispatch } from "react-redux";
import { getElectionResultDB } from "../../Redux/Async/election";

//컴포넌트
import CongratulationMessageBox from "./CongratulationMessageBox";

//testResult는 체험용 투표결과를 담은 정보입니다.
const ElectedCard = ({ electionPostId, candidates, testResult }) => {
    const dispatch = useDispatch();
    const result = useSelector(state => state.election.resultList); //result안에는 투표에 대한 정보가 들어있고, 투표를 한 사람이 없으면 result는 빈 배열입니다.

    //electedPerson은 당선자의 ID와 최대득표수에 대한 정보입니다.
    const electedPerson =
        result &&
        result.length > 0 &&
        result.reduce(
            (acc, cur) => {
                if (acc && acc.count < cur.count) {
                    acc.count = cur.count;
                    acc.candidateId = cur.candidate_id;
                    return acc;
                }
            },
            { count: 0 },
        );

    // 당선자의 정보가 들어있습니다.
    let electedInfo =
        electedPerson &&
        candidates &&
        candidates.reduce((acc, cur, idx) => {
            //여기서 idx를 넣는 이유는 당선자의 기호번호를 알기위함입니다.
            const election_num = idx + 1;
            return { ...cur, election_num };
        });

    //출마한 후보자가 1명이고, 투표를 한 사람이없으면 무투표당선입니다.
    if (result && result.length === 0 && candidates.length === 1)
        electedInfo = { ...candidates[0], election_num: 1 };

    //notElected가 true면 당선자가 없습니다.
    const notElected = !electedInfo ? true : false;

    useEffect(() => {
        if (!electionPostId) return;
        const req = {
            election_id: electionPostId,
        };
        dispatch(getElectionResultDB(req));
    }, [dispatch]);

    //테스트용 결과페이지입니다.
    if (testResult) {
        return (
            <Container>
                <ElectedBox>
                    <ElectedImage>
                        <img
                            src={testResult[0].photo}
                            alt={testResult[0].name}
                        />
                    </ElectedImage>
                    <ElectedInfo>
                        <ElectedName>
                            기호 {testResult[0].candidate_id}번{" "}
                            {testResult[0].name}
                        </ElectedName>
                        <ElectedMajor>{testResult[0].major}</ElectedMajor>

                        {/* 당선축하메세지 박스 */}
                        <CongratulationMessageBox
                            electionPostId={electionPostId}
                            isTest
                        />
                    </ElectedInfo>
                </ElectedBox>
            </Container>
        );
    }

    return (
        <Container>
            {notElected && <NotElected>당선자가 없습니다</NotElected>}
            {electedInfo && (
                <ElectedBox>
                    <ElectedImage>
                        {electedInfo.photo ? (
                            <img
                                src={
                                    process.env.REACT_APP_API_URL +
                                    electedInfo?.photo
                                }
                                alt={electedInfo?.name}
                            />
                        ) : (
                            <span>이미지가 없습니다!</span>
                        )}
                    </ElectedImage>
                    <ElectedInfo>
                        <ElectedName>
                            기호 {electedInfo.election_num}번{" "}
                            {electedInfo?.name}
                        </ElectedName>
                        <ElectedMajor>{electedInfo?.major}</ElectedMajor>

                        {/* 당선축하메세지 박스 */}
                        <CongratulationMessageBox
                            electionPostId={electionPostId}
                        />
                    </ElectedInfo>
                </ElectedBox>
            )}
        </Container>
    );
};

const Container = styled.div`
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

export default ElectedCard;
