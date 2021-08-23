import React, { useState, useEffect } from "react";

import instance from "../api";

import MyPostBoardBox from "./MyPostBoardBox";

const MyCommentedList = () => {
    const [page, setPage] = useState(1); //초기 페이지 값
    const [postList, setPostList] = useState([]);

    // 게시물 요청시 옵션 정보 (페이수 per 게시물, 현재 페이지 )
    const req = {
        pageNum: page,
        pageSize: 10,
    };

    useEffect(() => {
        const requestCall = async ({ pageNum, pageSize }) =>
            instance.get("/api/user/my-comment", {
                params: {
                    pageNum,
                    pageSize,
                },
            });
        requestCall(req).then(res => {
            if (res.data.ok) {
                console.log(res.data.comments);
                setPostList(res.data.comments);
            }
        });
    }, []);

    return <MyPostBoardBox postList={postList} Comment={true} />;
};

export default MyCommentedList;
