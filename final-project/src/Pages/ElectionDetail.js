import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getElectionDB } from "../redux/async/election";

const ElectionDetail = () => {
    const dispatch = useDispatch();
    const { id: electionId } = useParams();
    const post = useSelector(state => state.election.list);

    useEffect(() => {
        dispatch(getElectionDB(electionId));
    }, []);

    return <div>디테일</div>;
};

export default ElectionDetail;
