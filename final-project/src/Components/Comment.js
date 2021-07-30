import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getFreeCommentListDB, addFreeCommentDB } from "../redux/async/comment";
import { useDispatch, useSelector } from "react-redux";

import TableContent from "./TableContent";

/**
 * @author kwonjiyeong
 * @param props : {history, location, match}
 * @returns 자유게시판 게시물 상세페이지 뷰
 * @역할 자유게시판 게시물 상세페이지 뷰 렌더링
 * @필수값 postId
 */

const Comment = ({ postId }) => {
    const dispatch = useDispatch();
    const commentList = useSelector(state => state.comment.list);
    const user = useSelector(state => state.user.user);
    const [content, setContent] = useState(""); //댓글 입력값
    useEffect(() => {
        //특정게시물 댓글 가져오기
        dispatch(getFreeCommentListDB(postId));
    }, []);
    const addComment = () => {
        //댓글을 추가하는 기능
        const req = {
            user_id: user.user_id,
            post_id: postId,
            content: content,
        };
        dispatch(addFreeCommentDB(req));
        setContent("");
    };

    return (
        <>
            <CommentWrite>
                <input
                    type="text"
                    onChange={e => setContent(e.target.value)}
                    onKeyPress={e => e.key === "Enter" && addComment()} //엔터키를 눌렀을 때, 코멘트가 추가되도록 설정!
                    value={content} //나중에 댓글을 추가하고 value 값을 지울 때, ref를 사용하지 않고, state를 활용하여 지우기 위해 value props를 설정!
                    placeholder="댓글을 입력해주세요!"
                />
                <button onClick={addComment}>등록</button>
            </CommentWrite>
            {commentList && commentList.length > 0 && (
                <>
                    <h3>댓글 {commentList.length}개</h3>
                    <CommentTable>
                        <TableRow>
                            <div>
                                <span>작성자</span>
                            </div>
                            <div>
                                <span>내용</span>
                            </div>
                            <div>
                                <span>컨트롤러</span>
                            </div>
                        </TableRow>
                        {commentList &&
                            commentList.map(comment => (
                                <TableRow key={comment.comment_id}>
                                    <TableContent {...comment} />
                                </TableRow>
                            ))}
                    </CommentTable>
                </>
            )}
        </>
    );
};

const CommentWrite = styled.div``;

const CommentTable = styled.div`
    border: 2px solid gray;
    > div:not(:last-child) {
        border-bottom: 1px solid gray;
    }
`;

const TableRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    > div {
        padding: 10px;
    }
    > div:not(:last-child) {
        border-right: 1px solid gray;
    }
`;

export default Comment;
