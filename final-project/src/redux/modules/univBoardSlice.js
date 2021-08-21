import { createSlice } from "@reduxjs/toolkit";
import {
    getUnivBoardDB,
    detailUnivBoardPostDB,
    addUnivBoardPostDB,
    editUnivBoardPostDB,
    deleteUnivBoardPostDB,
    getUnivBoardCommentDB,
    addUnivBoardCommentDB,
    editUnivBoardCommentDB,
    deleteUnivBoardCommentDB,
    univLikeToggleDB,
} from "../async/univBoard";

const initialState = {
    list: [],
    post: null,
    commentList: [],
    fixedList: [],
    isFetching: false,
    errorMessage: "",
    pageCount: null,
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
        //사용자가 로그인하고 게시글에 처음 들어갔을때 바로 뷰 카운트를 추가해주는 리듀서
        setUnivViewReducer: (state, action) => {
            state.post.view_count += 1;
        },
        //사용자가 게시글 좋아요를 누르면 바로 게시글의 전체 좋아요 수를 증가해주는 리듀서
        increaseLike: (state, action) => {
            state.post.all_like += 1;
        },
        //사용자가 게시글 좋아요를 지우면 바로 게시글의 전체 좋아요 수를 감소해주는 리듀서
        decreaseLike: (state, action) => {
            state.post.all_like -= 1;
        },
    },
    extraReducers: {
        //┏---------------대학교 게시판 게시글 불러오기 reducer------------┓
        [getUnivBoardDB.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [getUnivBoardDB.fulfilled]: (state, { payload }) => {
            state.list = payload.result.rows;
            state.fixedList = payload.fixed_post.rows;
            state.pageCount = payload.page_count;
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
            state.post = detail;
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
            state.post = updatedPost;
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

        //--------------------------대학게시판 좋아요처리하는 리듀서------------------------
        [univLikeToggleDB.pending]: (state, action) => {
            state.isFetching = true;
        },
        [univLikeToggleDB.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.deleteCommentErrorMessage = "";
        },
        [univLikeToggleDB.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.deleteCommentErrorMessage = payload; //errorMessage
        },
    },
});

export const { onLogout, setUnivViewReducer, increaseLike, decreaseLike } =
    univBoardSlice.actions;

export default univBoardSlice;
