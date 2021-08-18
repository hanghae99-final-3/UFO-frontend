import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getElectionListDB } from "../redux/async/election";
import { history } from "../redux/configureStore";
import DefaultButton from "../Elements/Buttons/DefaultButton";

//컴포넌트
import Message from "../Components/Message";

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
                            <span>content:{ele.content}</span>
                            <span>candi:{ele.candidates.length}</span>
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
`;

const Post = styled.div`
    height: 100px;
`;

const Button = styled.button`
    padding: 10px;
`;

export default Election;
