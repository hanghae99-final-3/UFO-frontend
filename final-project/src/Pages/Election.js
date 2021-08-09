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

    console.log(electionList);
    return (
        <ElectionContainer>
            {electionList.map(ele => (
                <Post
                    key={ele.election_id}
                    onClick={() =>
                        history.push(`/election/detail/${ele.election_id}`)
                    }
                >
                    <h3>{ele.name}</h3>
                    <span>content:{ele.content}</span>
                </Post>
            ))}
            {/* <input type="file" onChange={e => console.log(e.target.files[0])} />
            <Freeview>
                <img src="" alt="" />
            </Freeview> */}
        </ElectionContainer>
    );
};

const ElectionContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    height: 1000px;
`;

const Post = styled.div``;

const Freeview = styled.div`
    width: 300px;
    height: 300px;
    background: pink;
`;

export default Election;
