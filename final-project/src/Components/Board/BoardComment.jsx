import React, { useState, useEffect } from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import TimeCounting from "time-counting";
import moment from "moment";

//통신
import {
    getFreeCommentListDB,
    addFreeCommentDB,
    editFreeCommentDB,
    deleteFreeCommentDB,
} from "../../Redux/Async/freeBoard";

import {
    getUnivBoardCommentDB,
    addUnivBoardCommentDB,
    editUnivBoardCommentDB,
    deleteUnivBoardCommentDB,
} from "../../Redux/Async/univBoard";

/**
 * @author kwonjiyeong
 * @param post: 포스트정보, boardName: 게시판이름
 * @returns 게시판 디테일페이지 댓글리스트 뷰
 * @역할 게시판 디테일페이지 댓글리스트 뷰 렌더링, 댓글 CRUD 기능 중 CR
 * @필수값 postId : 포스트아이디, boardName : 자유게시판이면 freeboard이고 대학게시판이면 univboard,
 */
const BoardComment = ({ boardName }) => {
    const dispatch = useDispatch();
    const { id: postId } = useParams();
    const user = useSelector(state => state.user.user); //유저정보
    const commentList = useSelector(state =>
        boardName === "freeboard"
            ? state.freeBoard.commentList
            : state.univBoard.commentList,
    );

    const [content, setContent] = useState(""); //댓글 입력값을 넣을 공간
    useEffect(() => {
        if (boardName === "freeboard")
            return dispatch(getFreeCommentListDB(postId));
        dispatch(getUnivBoardCommentDB(postId));
    }, []);

    const addComment = () => {
        //서버에 필요한 정보를 정리하고, 댓글을 추가하는 미들웨어 함수로 보내줍니다.
        if (user.user_id === undefined) return alert("로그인을 해주세요!"); //유저정보가 없으면 return 합니다.
        if (user.user_id && !content) return alert("댓글을 입력해주세요!");

        const req = {
            post_id: postId,
            content: content,
        };

        if (boardName === "freeboard") {
            //자유게시판과 연결되는 미들웨어함수로 보내줍니다.
            dispatch(addFreeCommentDB(req));
        }

        if (boardName === "univboard") {
            //대학게시판과 연결되는 미들웨어함수로 보내줍니다.
            if (!user.univ_id)
                return alert("마이페이지에서 대학 인증을 해주세요!");
            dispatch(addUnivBoardCommentDB(req));
        }

        setContent(""); //댓글을 추가하고, 댓글입력칸은 지워줍니다!
    };

    return (
        <BoardCommentContainer>
            <CommentWrite>
                <CommentInput
                    type="text"
                    onChange={e => setContent(e.target.value)}
                    onKeyPress={e => e.key === "Enter" && addComment()} //엔터키를 눌렀을 때, 코멘트가 추가되도록 설정!
                    value={content} //나중에 댓글을 추가하고 value 값을 지울 때, state를 활용하여 지우기 위해 value props를 설정!
                    placeholder="댓글을 적어주세요"
                />
                <button onClick={addComment}>등록</button>
            </CommentWrite>
            {/* 자유게시판일 때 렌더링 */}
            {commentList && (
                <>
                    <CommentBox>
                        {/* 댓글의 목록을 나타내는 컴포넌트입니다. */}
                        <CommentCnt>
                            <span>댓글 {commentList.length}개</span>
                        </CommentCnt>
                        {commentList &&
                            commentList.map(comment => (
                                // 각 댓글의 데이터들이 들어가는 공간입니다.
                                <Comment
                                    key={comment.comment_id}
                                    comment={comment}
                                    boardName={boardName}
                                    postId={postId}
                                />
                            ))}
                    </CommentBox>
                </>
            )}
        </BoardCommentContainer>
    );
};

const BoardCommentContainer = styled.div``;

const CommentWrite = styled.div`
    margin: 20px 0;
    padding-bottom: 10px;
    transition: border-bottom 0.3s ease;
    ${mixin.flexBox("space-between")}
    ${mixin.outline("2px solid", "mainGray", "bottom")}
    :hover {
        ${mixin.outline("2px solid", "gray1", "bottom")}
    }
    button {
        background: white;
        padding: 0 10px;
        border-radius: 10px;
    }
`;

const CommentBox = styled.div``;

const CommentCnt = styled.div`
    ${mixin.textProps(16, "semiBold", "gray2")}
    margin-bottom: 20px;
`;

/**
 * @author kwonjiyeong
 * @param props : 댓글 리스트 중 댓글에 한 개에 대한 정보가 들어있다.
 * @returns 자유게시판 특정 게시물의 특정 댓글 뷰
 * @역할 자유게시판 특정 게시물의 특정 댓글 뷰 렌더링, 댓글 CRUD 기능 중 UD
 * @필수값 boardName:게시판명, comment:특정댓글정보, postId:댓글들이있는 post의 id
 */

const Comment = ({ comment, boardName, postId }) => {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false); //수정모드인지 아닌지 판별해주는 스위치입니다.
    const [content, setContent] = useState(comment.content); //댓글 입력값을 저장할 곳입니다.
    const user = useSelector(state => state.user.user); //유저정보
    const isAuthor = user.user_id === comment.user_id ? true : false; //댓글의 작성자 인지 아닌지 판별해주는 값

    // 댓글 작성 시간 표기 기본 옵션 설정
    const timeOption = {
        lang: "ko",
        // objectTime: "2020-08-10 06:00:00",
        objectTime: moment().format(`YYYY-MM-DD HH:mm:ss`),
        calculate: {
            justNow: 61,
        },
    };

    const clickEditBtn = () => {
        //isEdit가 false가 되면 text가 나타나고, true면 input이 나타나게 하는 스위치작동함수
        setIsEdit(!isEdit);
    };

    const cancelEdit = () => {
        //수정을 하다가 취소버튼을 누를 때, 사용하는 기능
        setContent(comment.content);
        setIsEdit(false);
    };

    const editComment = () => {
        //서버로 보낼 데이터를 정리하여, 댓글을 수정하는 미들웨어함수로 보내줍니다.
        const req = {
            comment_id: comment.comment_id,
            content: content,
            post_id: postId,
        };

        if (boardName === "freeboard") {
            //자유게시판과 연결되는 미들웨어함수로 보내줍니다.
            dispatch(editFreeCommentDB(req));
        }

        if (boardName === "univboard") {
            //대학게시판과 연결되는 미들웨어함수로 보내줍니다.
            if (!user.univ_id)
                return alert("마이페이지에서 대학 인증을 해주세요!");
            dispatch(editUnivBoardCommentDB(req));
        }

        setIsEdit(false);
        setContent(content);
    };

    const deleteComment = () => {
        //서버로 보낼 데이터를 정리하여, 댓글을 삭제하는 미들웨어함수로 보내줍니다.
        const req = {
            comment_id: comment.comment_id,
            post_id: postId,
        };

        if (boardName === "freeboard") {
            //자유게시판과 연결되는 미들웨어함수로 보내줍니다.
            dispatch(deleteFreeCommentDB(req));
        }

        if (boardName === "univboard") {
            //대학게시판과 연결되는 미들웨어함수로 보내줍니다.
            if (!user.univ_id)
                return alert("마이페이지에서 대학 인증을 해주세요!");
            dispatch(deleteUnivBoardCommentDB(req));
        }

        setIsEdit(false);
    };

    return (
        <>
            <CommentContainer>
                <Header>
                    {/* 유저이미지 */}
                    <UserImage
                        src={require("../../Assets/pngegg2.webp").default}
                        alt="user"
                    />

                    {/* 유저닉네임 */}
                    <UserName>{comment.user.nickname}</UserName>

                    {/* 현재시간과 댓글생성시간과 비교한 시간 (지금은 댓글생성시간으로 표기됨) */}
                    <Time>{TimeCounting(comment.createdAt, timeOption)}</Time>

                    <Controls>
                        {/* 댓글의 작성자가 아니면 답글버튼이 나타납니다. */}
                        {!isAuthor && <button onClick={() => {}}>답글</button>}

                        {/* 댓글의 작성자가 맞으면 아래의 버튼들이 나타납니다. */}
                        {isAuthor && (
                            <>
                                {/* 수정모드면 취소,저장버튼이 나타나고, 아니면 수정,삭제버튼이 나타납니다. */}
                                {isEdit ? (
                                    <>
                                        <button onClick={cancelEdit}>
                                            취소
                                        </button>
                                        <button onClick={editComment}>
                                            저장
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={clickEditBtn}>
                                            수정
                                        </button>
                                        <button onClick={deleteComment}>
                                            삭제
                                        </button>
                                    </>
                                )}
                            </>
                        )}
                    </Controls>
                </Header>
                <Content>
                    {/* 수정모드면 input이 나타나고, 아니면 text가 나타납니다. */}
                    {isEdit ? (
                        <EditInput
                            type="text"
                            value={content}
                            placeholder="댓글을 적어주세요"
                            onChange={e => setContent(e.target.value)}
                        />
                    ) : (
                        <CommentContent>{comment.content}</CommentContent>
                    )}
                </Content>
            </CommentContainer>
        </>
    );
};

const CommentContainer = styled.div`
    padding-bottom: 20px;
`;

const Header = styled.div`
    ${mixin.flexBox(null, "center")}
    > * {
        height: 100%;
    }
    > :not(:last-child) {
        margin-right: 10px;
    }
`;

const UserImage = styled.img`
    height: 25px;
    width: 25px;
`;

const Controls = styled.div`
    line-height: 1;
    button {
        ${mixin.textProps(14, "semiBod", "gray1")}
        border-radius: 10px;
        background: white;
    }
    button:not(:last-child) {
        margin-right: 10px;
    }
`;
const Content = styled.div`
    ${mixin.textProps(20, "regular", "black")}
    margin-top: 3px;
`;

const UserName = styled.span`
    ${mixin.textProps(14, "semiBod", "gray2")}
`;
const Time = styled.span`
    ${mixin.textProps(14, "semiBod", "gray2")}
`;

const CommentInput = styled.input`
    all: unset;
    width: 95%;
`;

const EditInput = styled.input`
    transition: border-bottom 0.5s ease;
    all: unset;
    width: 40%;
    ${mixin.outline("2px solid", "mainGray", "bottom")}
    :hover {
        ${mixin.outline("2px solid", "gray1", "bottom")}
    }
    ::placeholder {
        ${mixin.textProps(20, "regular", "gray4")}
    }
`;

const CommentContent = styled.span`
    ${mixin.textProps(20, "regular", "black")}
`;

export default BoardComment;
