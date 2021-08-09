import { createSlice } from "@reduxjs/toolkit";
import {
    getUnivBoardDB,
    detailUnivBoardPostDB,
    addUnivBoardPostDB,
    getUnivBoardCommentDB,
    deleteUnivBoardPostDB,
    addUnivBoardCommentDB,
    editUnivBoardCommentDB,
    deleteUnivBoardCommentDB,
    editUnivBoardPostDB,
} from "../async/univBoard";

const initialState = {
    list: [],
    postDetail: {},
    commentList: [],
    isFetching: false,
    errorMessage: "",
    addRequestErrorMessage: "",
    deleteRequestErrorMessage: "",
    editRequestErrorMessage: "",
    addCommentErrorMessage: "",
    editCommentErrorMessage: "",
    getCommentErrorMessage: "",
    getUnivBoardErrorMessage: "",
    getDetailBoardErrorMessage: "",
};

const univBoardSlice = createSlice({
    name: "univBoard",
    initialState: initialState,
    reducers: {
        onLogout: state => {
            state.list = [];
        },
    },
    extraReducers: {
        //┏---------------대학교 게시판 게시글 불러오기 reducer------------┓
        [getUnivBoardDB.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [getUnivBoardDB.fulfilled]: (state, { payload: univBoardList }) => {
            state.list = univBoardList;
            state.isFetching = false;
            state.getUnivBoardErrorMessage = "";
        },
        [getUnivBoardDB.rejected]: (state, { payload: errorMessage }) => {
            state.getUnivBoardErrorMessage = errorMessage;
        },
        //------------------------------------------------------------------

        //┏----------대학교 게시판 게시글 상세정보 불러오기 reducer-----------┓
        [detailUnivBoardPostDB.pending]: (state, action) => {
            state.isFetching = true;
        },
        [detailUnivBoardPostDB.fulfilled]: (state, { payload: detail }) => {
            state.isFetching = false;
            state.postDetail = detail;
            state.getDetailBoardErrorMessage = "";
        },
        [detailUnivBoardPostDB.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.getDetailBoardErrorMessage = payload; // 에러 메세지
        },
        //-----------------------------------------------------------------

        //┏---------------대학교 게시판 게시글 작성 reducer-----------------┓
        [addUnivBoardPostDB.pending]: (state, action) => {
            state.isFetching = true;
        },
        [addUnivBoardPostDB.fulfilled]: (state, { payload: newPost }) => {
            state.isFetching = false;
            state.list.push(newPost);
            state.addRequestErrorMessage = "";
        },
        [addUnivBoardPostDB.rejected]: (state, { payload: errorMessage }) => {
            state.isFetching = false;
            state.addRequestErrorMessage = errorMessage;
        },
        //----------------------------------------------------------------

        //┏---------------대학교 게시판 게시글 작성 reducer-----------------┓
        [editUnivBoardPostDB.pending]: (state, action) => {
            state.isFetching = true;
        },
        [editUnivBoardPostDB.fulfilled]: (state, { payload: updatedPost }) => {
            state.isFetching = false;
            state.postDetail.title = updatedPost.title;
            state.postDetail.content = updatedPost.content;
            state.postDetail.category = updatedPost.category;
            state.postDetail.is_fixed = updatedPost.is_fixed;
            state.editRequestErrorMessage = "";
        },
        [editUnivBoardPostDB.rejected]: (state, { payload: errorMessage }) => {
            state.isFetching = false;
            state.editRequestErrorMessage = errorMessage;
        },

        //----------------------------------------------------------------
        //┏---------------대학교 게시판 게시글  삭제 reducer----------------┓
        [deleteUnivBoardPostDB.pending]: (state, action) => {
            state.isFetching = true;
        },
        [deleteUnivBoardPostDB.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.deleteRequestErrorMessage = "";
        },
        [deleteUnivBoardPostDB.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.deleteRequestErrorMessage = payload;
        },
        //----------------------------------------------------------------

        //---------------------------게시물 댓글 불러오기--------------------
        [getUnivBoardCommentDB.pending]: (state, action) => {
            state.isFetching = true;
        },
        [getUnivBoardCommentDB.fulfilled]: (
            state,
            { payload: commentList },
        ) => {
            state.isFetching = false;
            state.commentList = commentList;
            state.getCommentErrorMessage = "";
        },
        [getUnivBoardCommentDB.rejected]: (
            state,
            { payload: errorMessage },
        ) => {
            state.isFetching = false;
            state.getCommentErrorMessage = errorMessage;
        },
        //----------------------------------------------------------------

        //┏------------대학교 게시판 게시글  댓글 생성 reducer---------------┓
        [addUnivBoardCommentDB.pending]: (state, action) => {
            state.isFetching = true;
        },
        [addUnivBoardCommentDB.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.addCommentErrorMessage = "";
        },
        [addUnivBoardCommentDB.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.addCommentErrorMessage = payload;
        },
        //----------------------------------------------------------------

        //┏------------대학교 게시판 게시글  댓글 수정 reducer--------------┓
        [editUnivBoardCommentDB.pending]: (state, action) => {
            state.isFetching = true;
        },
        [editUnivBoardCommentDB.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.editCommentErrorMessage = "";
        },
        [editUnivBoardCommentDB.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.editCommentErrorMessage = payload;
        },
        //-----------------------------------------------------------------

        //--------------------------게시글 댓글 삭제------------------------
        [deleteUnivBoardCommentDB.pending]: (state, action) => {
            state.isFetching = true;
        },
        [deleteUnivBoardCommentDB.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.deleteCommentErrorMessage = "";
        },
        [deleteUnivBoardCommentDB.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.deleteCommentErrorMessage = payload; //errorMessage
        },
    },
});

export const { onLogout } = univBoardSlice.actions;

export default univBoardSlice;
