import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getElectionListDB } from "../redux/async/election";
import { history } from "../redux/configureStore";

const Election = () => {
    const dispatch = useDispatch();
    const electionList = useSelector(state => state.election.list);
    const user = useSelector(state => state.user.user);
    useEffect(() => {
        dispatch(getElectionListDB());
    }, []);

    return (
        <>
            <ElectionContainer>
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
            </ElectionContainer>
            <Button onClick={() => history.push(`/election/write`)}>
                추가하기
            </Button>
        </>
    );
};

const ElectionContainer = styled.div`
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
