import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { userApi } from "../api";
import BoardBox from "./BoardBox";

const MyUnivPost = () => {
    const [myUnivPosts, setMyUnivPosts] = useState([]);
    const [myUnivComments, setMyUnivComments] = useState([]);
    const [postOrComment, setPostOrComment] = useState("post");

    const requestPostList = async req => {
        await userApi.getMyPosts(req).then(response => {
            if (response.data.ok) {
                setMyUnivPosts(response.data.my_univ_post);
            }
        });
        await userApi.getMyCommentedPost(req).then(response => {
            if (response.data.ok) {
                setMyUnivComments(response.data.my_univ_comment);
            }
        });
    };
    const toPostView = () => {
        setPostOrComment("post");
    };
    const toCommentView = () => {
        setPostOrComment("comment");
    };

    useEffect(() => {
        const req = {
            pageSize: 10,
            pageNum: 1,
        };
        requestPostList(req);
    }, []);
    return (
        <div style={{ marginTop: "30px" }}>
            <span style={{ display: "block", fontSize: "40px" }}>
                대학 게시판
            </span>
            <Button onClick={toPostView}>내가 작성한 글</Button>
            <Button onClick={toCommentView}>댓글 작성한 글</Button>
            {postOrComment === "post" ? (
                <BoardBox
                    postList={myUnivPosts && myUnivPosts}
                    boardName="univBoard"
                />
            ) : (
                <BoardBox
                    postList={myUnivComments && myUnivComments}
                    boardName="univBoard"
                />
            )}
        </div>
    );
};

export default MyUnivPost;
