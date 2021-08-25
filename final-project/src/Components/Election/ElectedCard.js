import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getElectionResultDB } from "../../redux/async/election";
import mixin from "../../styles/Mixin";
import CongratulationMessageBox from "./CongratulationMessageBox";

const ElectedCard = ({ electionPostId, candidates }) => {
    const dispatch = useDispatch();
    const result = useSelector(state => state.election.resultList);

    //electedPerson은 당선자의 ID와 최대득표수에 대한 정보입니다.
    const electedPerson =
        result &&
        result.reduce(
            (acc, cur, idx) => {
                if (acc && acc.count < cur.count) {
                    acc.count = cur.count;
                    acc.candidateId = cur.candidate_id;
                    return acc;
                }
            },
            { count: 0 },
        );

    //notElected가 true면 당선자가 없습니다.
    const notElected = electedPerson === undefined ? true : false;

    // 당선자의 정보가 들어있습니다.
    const electedInfo =
        electedPerson &&
        candidates &&
        candidates.reduce((acc, cur, idx) => {
            if (cur.candidate_id === electedPerson.candidateId)
                return { ...cur, idx }; //여기서 idx를 넣는 이유는 당선자의 기호번호를 알기위함입니다.
        });

    useEffect(() => {
        if (!electionPostId) return;
        const req = {
            election_id: electionPostId,
        };
        dispatch(getElectionResultDB(req));
    }, []);

    return (
        <Container>
            {notElected && <NotElected>당선자가 없습니다</NotElected>}
            {electedInfo && (
                <ElectedBox>
                    <ElectedImage>
                        {electedInfo.photo ? (
                            <img
                                src={`http://3.36.90.60/${electedInfo?.photo}`}
                                alt={electedInfo?.name}
                            />
                        ) : (
                            <span>이미지가 없습니다!</span>
                        )}
                    </ElectedImage>
                    <ElectedInfo>
                        <ElectedName>
                            기호 {electedInfo.idx}번 {electedInfo?.name}
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
    ${mixin.flexBox("center", "center")}
    ${mixin.textProps(20, "regular", "white")}
    width: 380px;
    height: 100%;
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
