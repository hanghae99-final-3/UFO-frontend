import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getElectionListDB } from "../../redux/async/election";
import { history } from "../../redux/configureStore";
import moment from "moment";
import mixin from "../../styles/Mixin";

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
            <Title>
                <h5>투표함</h5>
                <DefaultButton onClick={() => history.push(`/election/write`)}>
                    추가하기
                </DefaultButton>
            </Title>
            <Selecter selected={isFinished}>
                <button onClick={() => setIsFinished(false)}>진행중선거</button>
                <button onClick={() => setIsFinished(true)}>종료된선거</button>
            </Selecter>
            {currentList && currentList.length < 1 ? (
                <Message
                    message="아직 투표가 없습니다"
                    link="/"
                    buttonValue="홈으로"
                />
            ) : (
                <>
                    <GridContainer>
                        {currentList.map(ele => (
                            <Post
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
                                    <VotingComplete>투표 완료!</VotingComplete>
                                )}
                            </Post>
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
    ${mixin.flexBox("space-between", "flex-end")};
    padding-bottom: 10px;
    margin-bottom: 15px;
    h5 {
        ${mixin.textProps(30, "extraBold", "black")};
    }
`;

const Selecter = styled.div`
    button {
        padding: 0 10px;
        height: 30px;
        text-align: center;
        margin-right: 7px;
        border-radius: 16px;
        ${mixin.textProps(18, "semiBold", "gray1")};
        background-color: ${props => props.theme.color.white};
        :first-child {
            ${props =>
                mixin.outline(
                    "2px solid",
                    !props.selected ? "mainMint" : "blue2",
                )}
            margin-right: 15px;
        }
        :last-child {
            ${props =>
                mixin.outline(
                    "2px solid",
                    props.selected ? "mainMint" : "blue2",
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

const Post = styled.div`
    overflow: hidden;
    border-radius: 50px;
    cursor: pointer;
    padding: 20px;
    ${mixin.outline("3px solid", "blue2")}
    ${mixin.flexBox("center", "center", null, "100px")};
    ${mixin.floatBox("relative")}
    ${props =>
        props.isVoted
            ? mixin.outline("3px solid", "gray1")
            : mixin.outline("3px solid", "blue2")}
    span {
        ${mixin.textboxOverflow(2)}
    }
`;

const VotingComplete = styled.div`
    ${mixin.floatBox("absolute")}
    width: 100%;
    background: rgba(0, 0, 0, 0.55);
    ${mixin.textProps(20, "regular", "mainMint")}
    ${mixin.flexBox("center", "center")};
`;

export default Election;
