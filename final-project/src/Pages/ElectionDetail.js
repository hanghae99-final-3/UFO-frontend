import React, { useEffect } from "react";
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
            <button onClick={deletePost}>삭제하기</button>
        </>
    );
};

export default ElectionDetail;
