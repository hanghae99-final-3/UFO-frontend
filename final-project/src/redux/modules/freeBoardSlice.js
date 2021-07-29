import { createSlice } from "@reduxjs/toolkit";
import {
    getFreeListDB,
    addFreePostDB,
    editFreePostDB,
    deleteFreePostDB,
} from "../async/freeBoard";

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
    name: "freeBoard",
    initialState: initialState,
    reducers: {},

    //extraReducers 외부 작업을 참조(e.g 비동기 처리)
    extraReducers: {
        //----자유게시판 목록 불러오는 리듀서
        [getFreeListDB.fulfilled]: (state, { payload }) => {
            state.list = payload;
            state.isFetching = false;
            state.errorMessage = null;
        },
        [getFreeListDB.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [getFreeListDB.rejected]: (state, { payload: errorMessage }) => {
            state.isFetching = false;
            state.errorMessage = errorMessage;
        },
        //----

        //----자유게시판 게시물 추가하는 리듀서
        [addFreePostDB.fulfilled]: (state, { payload }) => {
            state.list.push(payload);
            state.isFetching = false;
            state.errorMessage = null;
        },
        [addFreePostDB.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [addFreePostDB.rejected]: (state, { payload: errorMessage }) => {
            state.isFetching = false;
            state.errorMessage = errorMessage;
        },
        //----

        //----자유게시판 특정 게시물 수정하는 리듀서
        [editFreePostDB.fulfilled]: (state, { payload }) => {
            //payload에는 수정되어서 변경된 게시물 데이터가 들어오며, 기존 state.list와 같은 idx를 찾아서 변경해준다.
            let idx = state.list.findIndex(post => {
                return post.post_id === payload.post_id;
            });
            state.list[idx] = payload;
            state.isFetching = false;
            state.errorMessage = null;
        },
        [editFreePostDB.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [editFreePostDB.rejected]: (state, { payload: errorMessage }) => {
            state.isFetching = false;
            state.errorMessage = errorMessage;
        },
        //----

        //----자유게시판 특정 게시물 삭제하는 리듀서
        [deleteFreePostDB.fulfilled]: (state, { payload }) => {
            //payload에는 삭제될 post_id가 넘겨져오며, 기존 state.list 중 post.id가 payload와 같은 게시글이 있다면 삭제한다.
            const freeBoardList = state.list.filter(post => {
                if (post.post_id !== payload) return post;
            });
            state.list = freeBoardList;
            state.isFetching = false;
            state.errorMessage = null;
        },
        [deleteFreePostDB.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [deleteFreePostDB.rejected]: (state, { payload: errorMessage }) => {
            state.isFetching = false;
            state.errorMessage = errorMessage;
        },
        //----
    },
});

export default freeBoardSlice;
