import { createSlice } from "@reduxjs/toolkit";
import { getElectionListDB, getElectionDB } from "../async/election";

/**
 * @initialState freeBoardList:자유게시판 목록, isFetching:자유게시판 목록을 가져오는 중인가, errorMessage: 에러메세지
 * @역할 자유게시판 CRUD
 */

const initialState = {
    list: null,
    post: null,
    isFetching: false,
    errorMessage: null,
};

//
const electionSlice = createSlice({
    name: "election",
    initialState: initialState,
    reducers: {},

    //extraReducers 외부 작업을 참조(e.g 비동기 처리)
    extraReducers: {
        //----선거 목록 불러오는 리듀서
        [getElectionListDB.fulfilled]: (state, { payload }) => {
            state.list = payload;
            state.isFetching = false;
            state.errorMessage = null;
        },
        [getElectionListDB.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [getElectionListDB.rejected]: (state, { payload: errorMessage }) => {
            state.isFetching = false;
            state.errorMessage = errorMessage;
        },
        //----

        //----특정 선거 게시물을 불러오는 리듀서
        [getElectionDB.fulfilled]: (state, { payload }) => {
            state.post = payload;
            state.isFetching = false;
            state.errorMessage = null;
        },
        [getElectionDB.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [getElectionDB.rejected]: (state, { payload: errorMessage }) => {
            state.isFetching = false;
            state.errorMessage = errorMessage;
        },
        //----
    },
});

export const {} = electionSlice.actions;

export default electionSlice;
