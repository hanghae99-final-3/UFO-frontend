import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import {
    addFreeCommentDB,
    editFreeCommentDB,
    deleteFreeCommentDB,
} from "../redux/async/freeBoard";

import {
    getCommentDB,
    addUniBoardCommentDB,
    editUniBoardCommentDB,
    deleteUniBoardCommentDB,
} from "../redux/async/univBoard";

/**
 * @author kwonjiyeong
 * @param post: 포스트정보, boardName: 게시판이름
 * @returns 게시판 디테일페이지 댓글리스트 뷰
 * @역할 게시판 디테일페이지 댓글리스트 뷰 렌더링
 * @필수값 postId, boardName
 */
const BoardComment = ({ commentList, boardName, postId }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user); //유저정보

    const [content, setContent] = useState(""); //댓글 입력값을 넣을 공간

    const addComment = () => {
        //서버에 필요한 정보를 정리하고, 댓글을 추가하는 미들웨어 함수로 보낸다.
        if (user.user_id === undefined) return alert("로그인을 해주세요!"); //유저정보가 없으면 return 합니다.
        if (user.user_id && !content) return alert("댓글을 입력해주세요!");

        if (boardName === "univboard") {
            if (!user.univ_id)
                return alert("마이페이지에서 대학 인증을 해주세요!");
        }

        const req = {
            post_id: postId,
            content: content,
        };

        dispatch(addFreeCommentDB(req));
        setContent(""); //댓글을 추가하고, 댓글입력칸은 지워줍니다!
    };

    return (
        <BoardCommentContainer>
            <CommentWrite>
                <input
                    type="text"
                    onChange={e => setContent(e.target.value)}
                    onKeyPress={e => e.key === "Enter" && addComment()} //엔터키를 눌렀을 때, 코멘트가 추가되도록 설정!
                    value={content} //나중에 댓글을 추가하고 value 값을 지울 때, state를 활용하여 지우기 위해 value props를 설정!
                    placeholder="댓글을 입력해주세요!"
                />
                <button onClick={addComment}>등록</button>
            </CommentWrite>

            {/* 자유게시판일 때 렌더링 */}
            {commentList && (
                <>
                    <h3>댓글 {commentList.length}개</h3>
                    <CommentTable>
                        {/* 댓글의 목록을 나타내는 컴포넌트입니다. */}
                        <TableRow>
                            {/* 댓글의 헤더가 들어가는 공간입니다. */}
                            <div>
                                <span>작성자</span>
                            </div>
                            <div>
                                <span>내용</span>
                            </div>
                            <div></div>
                        </TableRow>
                        {commentList &&
                            commentList.map(comment => (
                                <TableRow key={comment.comment_id}>
                                    {/* 각 댓글의 데이터들이 들어가는 공간입니다. */}
                                    <TableContent {...comment} />
                                </TableRow>
                            ))}
                    </CommentTable>
                </>
            )}
        </BoardCommentContainer>
    );
};

const BoardCommentContainer = styled.div`
    background: #f5f5f5;
    padding: 20px;
`;

const CommentWrite = styled.div`
    border-bottom: 2px solid #707070;
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    padding-bottom: 10px;
    input {
        all: unset;
    }
    button {
        padding: 0 10px;
        border-radius: 10px;
    }
`;

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
    > div:first-child {
        border-right: 1px solid gray;
    }
    > div:last-child {
        display: flex;
        justify-content: flex-end;
        button {
            margin-left: 10px;
        }
    }
`;

/**
 * @author kwonjiyeong
 * @param props : {history, location, match}
 * @returns 자유게시판 특정 게시물의 특정 댓글 뷰
 * @역할 자유게시판 특정 게시물의 특정 댓글 뷰 렌더링, 댓글 CRUD 기능 중 UD
 * @필수값 props (부모컴포넌트로부터 하나의 댓글 정보가 담겨져서 온다.)
 */

const TableContent = props => {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false); //수정모드인지 아닌지 판별해주는 스위치입니다.
    const [content, setContent] = useState(props.content); //댓글 입력값을 저장할 곳입니다.
    const user = useSelector(state => state.user.user); //유저정보
    const isAuthor = user.user_id === props.user_id ? true : false; //댓글의 작성자 인지 아닌지 판별해주는 값

    const clickEditBtn = () => {
        //isEdit가 false가 되면 text가 나타나고, true면 input이 나타나게 하는 스위치작동함수
        setIsEdit(!isEdit);
    };

    const cancelEdit = () => {
        //수정을 하다가 취소버튼을 누를 때, 사용하는 기능
        setContent(props.content);
        setIsEdit(false);
    };

    const editComment = () => {
        //서버로 보낼 데이터를 정리하여, 댓글을 수정하는 미들웨어함수로 보내줍니다.
        const req = {
            comment_id: props.comment_id,
            content: content,
        };
        dispatch(editFreeCommentDB(req));
        setIsEdit(false);
        setContent(content);
    };

    const deleteComment = () => {
        //서버로 보낼 데이터를 정리하여, 댓글을 삭제하는 미들웨어함수로 보내줍니다.
        const req = {
            comment_id: props.comment_id,
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
            <div>
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
                {/* 댓글의 작성자가 맞으면 버튼들이 나타납니다. */}
                {isAuthor && (
                    <>
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
                    </>
                )}
            </div>
        </>
    );
};

export default BoardComment;
