import { createSlice } from "@reduxjs/toolkit";
import {
    getElectionListDB,
    getElectionDB,
    addElectionDB,
    editElectionDB,
    deleteElectionDB,
    addVoteDB,
    getElectionResultDB,
    getCongratulationDB,
    addCongratulationDB,
    editCongratulationDB,
    deleteCongratulationDB,
} from "../async/election";

/**
 * @initialState freeBoardList:자유게시판 목록, isFetching:자유게시판 목록을 가져오는 중인가, errorMessage: 에러메세지
 * @역할 자유게시판 CRUD
 */

const initialState = {
    list: [],
    post: null,
    resultList: [],
    congratulationList: [],
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

        //----특정 선거 게시물을 추가하는 리듀서
        [addElectionDB.fulfilled]: (state, { payload }) => {
            console.log(payload);
            return;
            state.list.pop(payload);
            state.isFetching = false;
            state.errorMessage = null;
        },
        [addElectionDB.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [addElectionDB.rejected]: (state, { payload: errorMessage }) => {
            state.isFetching = false;
            state.errorMessage = errorMessage;
        },
        //----

        //----특정 선거 게시물을 수정하는 리듀서
        [editElectionDB.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.errorMessage = null;
        },
        [editElectionDB.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [editElectionDB.rejected]: (state, { payload: errorMessage }) => {
            state.isFetching = false;
            state.errorMessage = errorMessage;
        },
        //----

        //----특정 선거 게시물을 삭제하는 리듀서
        [deleteElectionDB.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.errorMessage = null;
        },
        [deleteElectionDB.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [deleteElectionDB.rejected]: (state, { payload: errorMessage }) => {
            state.isFetching = false;
            state.errorMessage = errorMessage;
        },
        //----

        //----투표를 추가하는 리듀서
        [addVoteDB.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.errorMessage = null;
        },
        [addVoteDB.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [addVoteDB.rejected]: (state, { payload: errorMessage }) => {
            state.isFetching = false;
            state.errorMessage = errorMessage;
        },
        //----

        //----특정 선거 게시물 결과를 불러오는 리듀서
        [getElectionResultDB.fulfilled]: (state, { payload }) => {
            state.resultList = payload;
            state.isFetching = false;
            state.errorMessage = null;
        },
        [getElectionResultDB.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [getElectionResultDB.rejected]: (state, { payload: errorMessage }) => {
            state.isFetching = false;
            state.errorMessage = errorMessage;
        },
        //----

        //----특정 선거 게시물 당선축하메세지를 불러오는 리듀서
        [getCongratulationDB.fulfilled]: (state, { payload }) => {
            state.congratulationList = payload;
            state.isFetching = false;
            state.errorMessage = null;
        },
        [getCongratulationDB.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [getCongratulationDB.rejected]: (state, { payload: errorMessage }) => {
            state.isFetching = false;
            state.errorMessage = errorMessage;
        },
        //----

        //----특정 선거 게시물 당선축하메세지를 추가하는 리듀서
        [addCongratulationDB.fulfilled]: (state, { payload }) => {
            state.congratulationList.unshift(payload);
            state.isFetching = false;
            state.errorMessage = null;
        },
        [addCongratulationDB.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [addCongratulationDB.rejected]: (state, { payload: errorMessage }) => {
            state.isFetching = false;
            state.errorMessage = errorMessage;
        },
        //----

        //----특정 선거 게시물 당선축하메세지를 수정하는 리듀서
        [editCongratulationDB.fulfilled]: (state, { payload }) => {
            let idx = state.congratulationList.findIndex(
                comment => comment.comment_id === payload.comment_id,
            );
            state.congratulationList[idx].content = payload.content;
            state.isFetching = false;
            state.errorMessage = null;
        },
        [editCongratulationDB.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [editCongratulationDB.rejected]: (state, { payload: errorMessage }) => {
            state.isFetching = false;
            state.errorMessage = errorMessage;
        },
        //----

        //----특정 선거 게시물 당선축하메세지를 삭제하는 리듀서
        [deleteCongratulationDB.fulfilled]: (state, { payload }) => {
            const congratulationList = state.congratulationList.filter(
                comment => comment.comment_id !== payload,
            );
            state.congratulationList = congratulationList;
            state.isFetching = false;
            state.errorMessage = null;
        },
        [deleteCongratulationDB.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [deleteCongratulationDB.rejected]: (
            state,
            { payload: errorMessage },
        ) => {
            state.isFetching = false;
            state.errorMessage = errorMessage;
        },
        //----
    },
});
export const {} = electionSlice.actions;

export default electionSlice;
