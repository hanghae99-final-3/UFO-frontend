import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import { userApi } from "../api";
import BoardBox from "./BoardBox";

const MyFreePost = () => {
    const [myFreePosts, setMyFreePosts] = useState([]);
    const [myFreeComments, setMyFreeComments] = useState([]);
    const [postOrComment, setPostOrComment] = useState("post");

    const requestPostList = async req => {
        await userApi.getMyPosts(req).then(response => {
            if (response.data.ok) {
                setMyFreePosts(response.data.my_free_post);
            }
        });
        await userApi.getMyCommentedPost(req).then(response => {
            if (response.data.ok) {
                setMyFreeComments(response.data.my_free_comment);
            }
        });
    };

    useEffect(() => {
        const req = {
            pageSize: 10,
            pageNum: 1,
        };
        requestPostList(req);
    }, []);

    const toPostView = () => {
        setPostOrComment("post");
    };
    const toCommentView = () => {
        setPostOrComment("comment");
    };

    return (
        <div style={{ marginTop: "30px" }}>
            <span style={{ display: "block", fontSize: "40px" }}>
                자유 게시판
            </span>
            <Button onClick={toPostView}>내가 작성한 글</Button>
            <Button onClick={toCommentView}>댓글 작성한 글</Button>
            {postOrComment === "post" ? (
                <BoardBox
                    postList={myFreePosts && myFreePosts}
                    boardName="freeBoard"
                    mypage={true}
                />
            ) : (
                <BoardBox
                    postList={myFreeComments && myFreeComments}
                    boardName="freeBoard"
                    mypage={true}
                />
            )}
        </div>
    );
};

export default MyFreePost;
