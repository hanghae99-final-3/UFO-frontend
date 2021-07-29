import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { freeBoardApi } from "../Api";

import { history } from "../redux/configureStore";

/**
 * @author kwonjiyeong
 * @param props : {history, location, match}
 * @returns 자유게시판 게시물 상세페이지 뷰
 * @역할 자유게시판 게시물 상세페이지 뷰 렌더링
 * @필수값 postId
 */

const Comment = ({ postId }) => {
    const [list, setList] = useState([]);
    useEffect(() => {
        //특정게시물 댓글 가져오기
        freeBoardApi.getComment(postId).then(res => setList(res.data.result));
    }, []);
    return (
        <>
            {list && list.length > 0 && (
                <>
                    <h3>댓글 {list.length}개</h3>
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
                        {list &&
                            list.map(ele => (
                                <TableRow
                                    key={ele.post_id}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        history.push(
                                            `/freeboard/detail/${ele.post_id}`,
                                        );
                                    }}
                                >
                                    <div>
                                        <span>{ele.user.nickname}</span>
                                    </div>
                                    <div>
                                        <span>{ele.content}</span>
                                    </div>
                                    <div>
                                        <button>수정</button>
                                        <button>삭제</button>
                                    </div>
                                </TableRow>
                            ))}
                    </CommentTable>
                </>
            )}
        </>
    );
};

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
