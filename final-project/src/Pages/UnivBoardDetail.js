import React, { useState, useEffect } from "react";
import {
    addUniBoardCommentDB,
    deleteUnivBoardPostDB,
    detailUnivBoardPostDB,
    editUnivBoardPostDB,
    getCommentDB,
} from "../redux/async/univBoardAsync";
import { useDispatch, useSelector } from "react-redux";
import UnivboardComment from "../Components/UnivboardComment";
import { history } from "../redux/configureStore";

const UnivBoardDetail = props => {
    const dispatch = useDispatch();
    const post = useSelector(state => state.univBoard.postDetail);
    const user = useSelector(state => state.user);
    const commentList = useSelector(state => state.univBoard.commentList);

    const postId = props.match.params.id;
    useEffect(() => {
        dispatch(detailUnivBoardPostDB(postId));
        dispatch(getCommentDB(postId));
    }, []);

    const handleDelete = () => {
        const data = {
            userId: user.user.user_id,
            postId: post.post_id,
        };
        dispatch(deleteUnivBoardPostDB(data));
        history.replace("/univBoard");
    };

    //------------------------댓글 기능-----------------------//
    const [comment, setComment] = useState("");

    const handleCommentChange = e => {
        setComment(e.target.value);
    };
    const handleCommentSubmit = () => {
        const data = {
            userId: user.user.user_id,
            postId,
            content: comment,
        };
        dispatch(addUniBoardCommentDB(data));
        setComment("");
    };

    //----------------------------수정------------------------
    const [category, setCategory] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.content);

    const handleEditSubmit = () => {
        const data = {
            postId: post.post_id,
            category,
            title,
            content,
            userId: user.user.user_id,
        };
        dispatch(editUnivBoardPostDB(data));
        setIsEditing(false);
    };
    const onEditChange = e => {
        const {
            target: { name, value },
        } = e;
        if (name === "title") {
            setTitle(value);
        } else {
            setContent(value);
        }
    };
    return (
        <React.Fragment>
            {isEditing && (
                <div>
                    <button onClick={() => setCategory(0)}>수업</button>
                    <button onClick={() => setCategory(1)}>맛집</button>
                    <button onClick={() => setCategory(2)}>스터디</button>
                    <button onClick={() => setCategory(3)}>알바</button>
                    <button onClick={() => setCategory(4)}>익명</button>
                    <button onClick={() => setCategory(5)}>기타</button>
                </div>
            )}
            {isEditing ? (
                <input
                    name="title"
                    value={title}
                    onChange={onEditChange}
                ></input>
            ) : (
                <span>title :{post.title}/</span>
            )}
            {isEditing ? (
                <input
                    name="content"
                    value={content}
                    onChange={onEditChange}
                ></input>
            ) : (
                <span>content :{post.content}/</span>
            )}

            <span>nickname :{post && post.user && post.user.nickname}</span>
            {post && post.user_id && post.user_id === user.user.user_id && (
                <button onClick={handleDelete}>삭제</button>
            )}
            <button onClick={() => setIsEditing(!isEditing)}>수정</button>
            <button onClick={handleEditSubmit}>수정 완료</button>
            {/* ----------------------댓글 작성------------------------- */}
            <div style={{ marginTop: "20px" }}>
                <input
                    name="comment"
                    value={comment}
                    onChange={handleCommentChange}
                ></input>
                <button onClick={handleCommentSubmit}>댓글 작성</button>
            </div>

            {/* ----------------------댓글 보여주기------------------------- */}
            {commentList &&
                commentList.length > 0 &&
                commentList.map((comment, idx) => (
                    <UnivboardComment
                        key={idx}
                        comment={comment}
                        user={user}
                        post={post}
                    />
                ))}
        </React.Fragment>
    );
};

export default UnivBoardDetail;
