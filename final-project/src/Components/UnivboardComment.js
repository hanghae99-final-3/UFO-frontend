import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    deleteUniBoardCommentDB,
    editUniBoardCommentDB,
} from "../redux/async/univBoardAsync";

const UnivboardComment = ({ comment, user, post }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(comment?.content);
    const onEditInputChange = e => {
        const {
            target: { name, value },
        } = e;
        if (name === "content") {
            setContent(value);
        }
    };
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleEditing = () => {
        const data = {
            userId: user.user.user_id,
            commentId: comment.comment_id,
            content,
            postId: post.post_id,
        };
        dispatch(editUniBoardCommentDB(data));
        toggleEdit();
    };
    const handleDelete = () => {
        const data = {
            userId: user.user.user_id,
            commentId: comment.comment_id,
            postId: post.post_id,
        };
        dispatch(deleteUniBoardCommentDB(data));
        // toggleEdit();
    };
    return (
        <React.Fragment>
            <div
                style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    width: "50%",
                }}
            >
                <div>
                    <strong>댓글 번호: </strong>
                    <span>{comment.comment_id} </span>
                </div>
                <div>
                    <strong>유저네임: </strong>
                    <span>{comment.user.nickname}</span>
                </div>
                <div>
                    <strong>댓글 내용: </strong>
                    {isEditing ? (
                        <input
                            name="content"
                            value={content}
                            onChange={onEditInputChange}
                        ></input>
                    ) : (
                        <span>{comment.content}</span>
                    )}
                </div>
                {comment &&
                    comment.user &&
                    comment.user.user_id &&
                    comment.user.user_id === user.user.user_id && (
                        <>
                            <button onClick={toggleEdit}>수정</button>
                            {isEditing && (
                                <button onClick={handleEditing}>
                                    수정 완료
                                </button>
                            )}
                            <button onClick={handleDelete}>삭제</button>
                        </>
                    )}
                <div></div>
            </div>
        </React.Fragment>
    );
};

export default UnivboardComment;
