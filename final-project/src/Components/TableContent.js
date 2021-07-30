import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editFreeCommentDB, deleteFreeCommentDB } from "../redux/async/comment";

const TableContent = props => {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [content, setContent] = useState(props.content);

    const clickEditBtn = () => {
        //isEdit가 false가 되면 text가 나타나고, true면 input이 나타나게 하는 스위치역할
        setIsEdit(!isEdit);
    };

    const cancelEdit = () => {
        //수정을 하다가 취소버튼을 누를 때, 사용하는 기능
        setContent(props.content);
        setIsEdit(false);
    };

    const editComment = () => {
        //실제적으로 댓글을 수정하는 역할
        const req = {
            comment_id: props.comment_id,
            user_id: props.user.user_id,
            content: content,
        };
        dispatch(editFreeCommentDB(req));
        setIsEdit(false);
        setContent(content);
    };

    const deleteComment = () => {
        //댓글을 삭제하는 역할
        const req = {
            comment_id: props.comment_id,
            user_id: props.user.user_id,
        };
        dispatch(deleteFreeCommentDB(req));
        setIsEdit(false);
        setContent(content);
    };

    return (
        <>
            <div>
                <span>{props.user.nickname}</span>
            </div>
            <div className="changeValue">
                {/* 수정모드면 input이 나타나고, 아니면 text가 나타납니다. */}
                {isEdit ? (
                    <input
                        type="text"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                ) : (
                    <span>{props.content}</span>
                )}
            </div>
            <div>
                {/* 수정모드면 취소,저장버튼이 나타나고, 아니면 수정,삭제버튼이 나타납니다. */}
                {isEdit ? (
                    <>
                        <button onClick={cancelEdit}>취소</button>
                        <button onClick={editComment}>저장</button>
                    </>
                ) : (
                    <>
                        <button onClick={clickEditBtn}>수정</button>
                        <button onClick={deleteComment}>삭제</button>
                    </>
                )}
            </div>
        </>
    );
};

export default TableContent;
