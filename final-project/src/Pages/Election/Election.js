import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getElectionListDB } from "../../redux/async/election";
import { history } from "../../redux/configureStore";
import moment from "moment";
import mixin from "../../styles/Mixin";
import { Helmet } from "react-helmet";

//컴포넌트
import Message from "../../Components/Message";
import DefaultButton from "../../Elements/Buttons/DefaultButton";

const Election = () => {
    const dispatch = useDispatch();
    const electionList = useSelector(state => state.election.list);
    const user = useSelector(state => state.user.user);
    const [isFinished, setIsFinished] = useState(false);
    useEffect(() => {
        dispatch(getElectionListDB());
    }, []);

    const ongoingElectionList = electionList.filter(post =>
        moment().isBefore(post.end_date),
    );
    const finishedElectionList = electionList.filter(post =>
        moment().isAfter(post.end_date),
    );
    const currentList = isFinished ? finishedElectionList : ongoingElectionList;
    const currentListName = isFinished ? "finished" : "ongoing";
    // const currentList = isFinished ? finishedElectionList:ongoingElectionList

    //대학 인증을 한 사람만 볼 수 있도록 예외처리를 합니다.
    if (!user.univ_id || !user.country_id)
        return (
            <Message
                message="대학인증을 한 사람만 선거게시글을 볼 수 있어요"
                link="/mypage"
                buttonValue="대학인증 하러가기"
            />
        );

    return (
        <ElectionContainer>
            <Helmet>
                <title>UFO - 투표함</title>
            </Helmet>
            <Title>투표함</Title>
            <Controls>
                <Selecter selected={isFinished}>
                    <button onClick={() => setIsFinished(false)}>
                        진행중선거
                    </button>
                    <button onClick={() => setIsFinished(true)}>
                        종료된선거
                    </button>
                </Selecter>
                <DefaultButton onClick={() => history.push(`/election/write`)}>
                    추가하기
                </DefaultButton>
            </Controls>
            {currentList && currentList.length < 1 ? (
                <Message
                    message="아직 투표가 없습니다"
                    link="/"
                    buttonValue="홈으로"
                />
            ) : (
                <>
                    <GridContainer>
                        {currentListName === "ongoing"
                            ? currentList.map(ele => (
                                  <OngoingPost
                                      key={ele.election_id}
                                      isVoted={ele.votes.length > 0}
                                      onClick={() =>
                                          history.push(
                                              `/election/detail/${ele.election_id}`,
                                          )
                                      }
                                  >
                                      <span>{ele.name}</span>
                                      {ele.votes.length > 0 && (
                                          <VotingComplete>
                                              투표 완료!
                                          </VotingComplete>
                                      )}
                                  </OngoingPost>
                              ))
                            : currentList.map(ele => (
                                  <FinishedPost
                                      key={ele.election_id}
                                      isVoted={ele.votes.length > 0}
                                      onClick={() =>
                                          history.push(
                                              `/election/detail/${ele.election_id}`,
                                          )
                                      }
                                  >
                                      <span>{ele.name}</span>
                                      {ele.votes.length > 0 && (
                                          <VotingComplete>
                                              투표 완료!
                                          </VotingComplete>
                                      )}
                                  </FinishedPost>
                              ))}
                    </GridContainer>
                </>
            )}
        </ElectionContainer>
    );
};

const ElectionContainer = styled.div``;

const Title = styled.div`
    ${mixin.outline("1px solid", "gray4", "bottom")};
    padding-bottom: 10px;
    margin-bottom: 15px;
    ${mixin.textProps(30, "extraBold", "black")};
`;

const Controls = styled.div`
    ${mixin.flexBox("space-between", "flex-end")};
    padding-bottom: 15px;
    ${mixin.outline("1px solid", "gray4", "bottom")};
`;

const Selecter = styled.div`
    button {
        padding: 0 10px;
        height: 30px;
        text-align: center;
        margin-right: 7px;
        border-radius: 16px;
        background-color: ${props => props.theme.color.white};
        :first-child {
            margin-right: 15px;
            transition: all 0.3s ease;
            ${props =>
                props.selected
                    ? mixin.textProps(18, "semiBold", "gray3")
                    : mixin.textProps(18, "semiBold", "gray1")}
            ${props =>
                props.selected
                    ? `box-shadow:  0 5px 5px -4px #cdcdcd;`
                    : `box-shadow: inset -2px 5px 5px -5px #cdcdcd;`}
            ${props =>
                mixin.outline(
                    "2px solid",
                    !props.selected ? "mainMint" : "blue2",
                )}
        }
        :last-child {
            transition: all 0.3s ease;
            ${props =>
                props.selected
                    ? mixin.textProps(18, "semiBold", "gray1")
                    : mixin.textProps(18, "semiBold", "gray3")}
            ${props =>
                props.selected
                    ? `box-shadow: inset -2px 5px 5px -4px #cdcdcd;`
                    : `box-shadow:  0 5px 5px -6px #cdcdcd;`}
            ${props =>
                mixin.outline(
                    "2px solid",
                    props.selected ? "mainMint" : "blue3",
                )}
        }
    }
`;

const GridContainer = styled.div`
    padding: 15px 0;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 30px 25px;
`;

const OngoingPost = styled.div`
    overflow: hidden;
    border-radius: 50px;
    cursor: pointer;
    padding: 20px 25px;
    ${mixin.outline("3px solid", "blue2")}
    ${mixin.flexBox("center", "center", null, "100px")};
    ${mixin.floatBox("relative")}
    ${props =>
        props.isVoted
            ? mixin.outline("3px solid", "gray1")
            : mixin.outline("3px solid", "blue2")};
    span {
        ${mixin.textProps(20, "regular", "gray1")}
        ${mixin.textboxOverflow(2)}
    }
`;

const FinishedPost = styled.div`
    overflow: hidden;
    border-radius: 50px;
    cursor: pointer;
    padding: 20px 25px;
    background: ${({ theme }) => theme.color.mainGray};
    ${mixin.outline("3px solid", "gray3")}
    ${mixin.flexBox("center", "center", null, "100px")};
    ${mixin.floatBox("relative")}
    ${props => (props.isVoted ? mixin.outline("3px solid", "gray2") : "")}

    :hover {
        background: ${({ theme }) => theme.color.white};
        span {
            ${mixin.textProps(20, "regular", "gray1")}
        }
    }
    span {
        ${mixin.textboxOverflow(2)}
        ${mixin.textProps(20, "regular", "gray2")}
    }
`;

const VotingComplete = styled.div`
    ${mixin.floatBox("absolute")}
    width: 100%;
    background: rgba(0, 0, 0, 0.55);
    ${mixin.textProps(20, "regular", "mainMint")}
    ${mixin.flexBox("center", "center")};
    :hover {
        opacity: 0;
    }
`;

export default Election;
