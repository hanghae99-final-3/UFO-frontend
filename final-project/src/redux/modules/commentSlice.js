import { createSlice } from "@reduxjs/toolkit";
import {
    getFreeCommentListDB,
    addFreeCommentDB,
    editFreeCommentDB,
    deleteFreeCommentDB,
} from "../async/comment";

/**
 * @initialState freeBoardList:자유게시판 목록, isFetching:자유게시판 목록을 가져오는 중인가, errorMessage: 에러메세지
 * @역할 자유게시판 CRUD
 */

const initialState = {
    list: null,
    isFetching: false,
    errorMessage: null,
};

//
const freeBoardSlice = createSlice({
    name: "comment",
    initialState: initialState,
    reducers: {},

    //extraReducers 외부 작업을 참조(e.g 비동기 처리)
    extraReducers: {
        //----자유게시판 특정게시물 댓글목록 불러오는 리듀서
        [getFreeCommentListDB.fulfilled]: (state, { payload }) => {
            //payload에는 서버에서 가져온 댓글정보들이 들어있습니다.
            state.list = payload;
            state.isFetching = false;
            state.errorMessage = null;
        },
        [getFreeCommentListDB.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [getFreeCommentListDB.rejected]: (state, { payload: errorMessage }) => {
            state.isFetching = false;
            state.errorMessage = errorMessage;
        },
        //----

        //----자유게시판 특정게시물 댓글목록 불러오는 리듀서
        [addFreeCommentDB.fulfilled]: (state, { payload }) => {
            //payload에는 추가된 댓글정보가 들어있습니다.
            state.list.push(payload);
            state.isFetching = false;
            state.errorMessage = null;
        },
        [addFreeCommentDB.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [addFreeCommentDB.rejected]: (state, { payload: errorMessage }) => {
            state.isFetching = false;
            state.errorMessage = errorMessage;
        },
        //----

        //----자유게시판 특정게시물 댓글목록 불러오는 리듀서
        [editFreeCommentDB.fulfilled]: (state, { payload }) => {
            //payload에는 comment_id와 content가 들어있고, comment_id로 특정 댓글찾아서, content를 바꿔줍니다.
            let idx = state.list.findIndex(
                comment => comment.comment_id === payload.comment_id,
            );
            state.list[idx].content = payload.content;
            state.isFetching = false;
            state.errorMessage = null;
        },
        [editFreeCommentDB.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [editFreeCommentDB.rejected]: (state, { payload: errorMessage }) => {
            state.isFetching = false;
            state.errorMessage = errorMessage;
        },
        //----

        //----자유게시판 특정게시물 댓글목록 불러오는 리듀서
        [deleteFreeCommentDB.fulfilled]: (state, { payload }) => {
            //payload에는 comment_id가 들어있고, 전체 state.list에서 comment_id가 포함되는 것을 빼고, state.list를 반환합니다.
            const freeBoardCommentList = state.list.filter(
                comment => comment.comment_id !== payload,
            );
            state.list = freeBoardCommentList;
            state.isFetching = false;
            state.errorMessage = null;
        },
        [deleteFreeCommentDB.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [deleteFreeCommentDB.rejected]: (state, { payload: errorMessage }) => {
            state.isFetching = false;
            state.errorMessage = errorMessage;
        },
        //----
    },
});

export default freeBoardSlice;
