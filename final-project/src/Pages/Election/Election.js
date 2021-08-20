import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getElectionListDB } from "../../redux/async/election";
import { history } from "../../redux/configureStore";
import DefaultButton from "../../Elements/Buttons/DefaultButton";

//컴포넌트
import Message from "../../Components/Message";
import mixin from "../../styles/Mixin";

const Election = () => {
    const dispatch = useDispatch();
    const electionList = useSelector(state => state.election.list);
    const user = useSelector(state => state.user.user);
    useEffect(() => {
        dispatch(getElectionListDB());
    }, []);

    //대학 인증을 한 사람만 볼 수 있도록 예외처리를 합니다.
    if (!user.univ_id || !user.country_id)
        return (
            <Message
                message="대학인증을 한 사람만 선거게시글을 볼 수 있어요"
                link="/mypage"
                buttonValue="대학인증하러가기"
            />
        );

    return (
        <ElectionContainer>
            <GridContainer>
                {electionList &&
                    electionList.map(ele => (
                        <Post
                            key={ele.election_id}
                            onClick={() =>
                                history.push(
                                    `/election/detail/${ele.election_id}`,
                                )
                            }
                        >
                            <h3>{ele.name}</h3>
                            {ele.votes.length > 0 && (
                                <VotingComplete>투표완료</VotingComplete>
                            )}
                        </Post>
                    ))}
            </GridContainer>
            <DefaultButton onClick={() => history.push(`/election/write`)}>
                추가하기
            </DefaultButton>
        </ElectionContainer>
    );
};

const ElectionContainer = styled.div``;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    margin-bottom: 15px;
`;

const Post = styled.div`
    ${mixin.outline("3px solid", "gray4")}
    border-radius: 20px;
    ${mixin.flexBox("center", "center", null, "100px")};
    ${mixin.floatBox("relative")}
`;

const VotingComplete = styled.div`
    ${mixin.floatBox("absolute", "50%", "50%")}
    transform: translateY(-50%) translateX(50%);
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 20px;
    ${mixin.textProps(20, "regular", "white")}
    ${mixin.flexBox("center", "center")};
`;

export default Election;
