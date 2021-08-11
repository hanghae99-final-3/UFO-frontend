import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getElectionDB, deleteElectionDB } from "../redux/async/election";

const ElectionDetail = () => {
    const dispatch = useDispatch();
    const { id: electionId } = useParams();
    const post = useSelector(state => state.election.post);

    useEffect(() => {
        dispatch(getElectionDB(electionId));
    }, []);

    const deletePost = () => {
        const req = {
            election_id: electionId,
        };

        dispatch(deleteElectionDB(req));
    };

    return (
        <>
            <Button onClick={deletePost}>삭제하기</Button>
        </>
    );
};

const Button = styled.button`
    padding: 10px;
`;

export default ElectionDetail;
