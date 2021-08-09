import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

const ElectionDetail = () => {
    const dispatch = useDispatch();
    const { id: postId } = useParams;
    const post = useSelector(state => state.election.list);

    useEffect(() => {
        dispatch();
    }, []);

    return <div>디테일</div>;
};

export default ElectionDetail;
