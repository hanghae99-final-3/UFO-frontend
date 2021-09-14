import { createSlice } from "@reduxjs/toolkit";
import {
    getFreeListDB,
    getFreePostDB,
    addFreePostDB,
    editFreePostDB,
    deleteFreePostDB,
    getFreeCommentListDB,
    addFreeCommentDB,
    editFreeCommentDB,
    deleteFreeCommentDB,
    getIssuePostListDB,
    postLikeToggleDB,
    getSearchResult,
    getFreeListDBInfinity,
} from "../Async/freeBoard";

/**
 * @initialState freeBoardList:자유게시판 목록, isFetching:자유게시판 목록을 가져오는 중인가, errorMessage: 에러메세지
 * @역할 자유게시판 CRUD
 */

const initialState = {
    list: [],
    issueList: [],
    post: null,
    commentList: null,
    isFetching: false,
    errorMessage: null,
    selectedCountryId: 0,
    selectedCountry: null,
    selectedTag: null,
    pageCount: null,
};

//
const freeBoardSlice = createSlice({
    name: "freeBoard",
    initialState: initialState,
    reducers: {
        setCountryReducer: (state, { payload }) => {
            state.selectedCountryId = payload.id;
            state.selectedCountry = payload;
        },
        setTagReducer: (state, { payload }) => {
            state.selectedTag = payload;
        },
        resetTagReducer: (state, action) => {
            state.selectedTag = null;
        },
        setSearchOrder: (state, { payload }) => {
            state.selectedSearchOrder = payload;
        },
        resetSearchOrder: (state, { payload }) => {
            state.selectedSearchOrder = null;
        },
        //사용자가 로그인하고 게시글에 처음 들어갔을때 바로 뷰 카운트를 추가해주는 리듀서
        setViewReducer: (state, action) => {
            state.post.view_count += 1;
        },
        //사용자가 게시글 좋아요를 누르면 바로 게시글의 전체 좋아요 수를 증가해주는 리듀서
        increaseLike: (state, action) => {
            state.post.all_like += 1;
            state.post.is_like = true;
        },
        //사용자가 게시글 좋아요를 지우면 바로 게시글의 전체 좋아요 수를 감소해주는 리듀서
        decreaseLike: (state, action) => {
            state.post.all_like -= 1;
            state.post.is_like = false;
        },
        infinityPostCall: (state, { payload }) => {
            state.list = [...state.list, ...payload];
        },
    },

    //extraReducers 외부 작업을 참조(e.g 비동기 처리)
    extraReducers: {
        //----자유게시판 목록 불러오는 리듀서
        [getFreeListDB.fulfilled]: (state, { payload }) => {
            state.list = payload?.result.rows;
            state.pageCount = payload?.result.countPage;
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
        [getFreeListDBInfinity.fulfilled]: (state, { payload }) => {
            state.list = [...state.list, ...payload?.result.rows];
            state.pageCount = payload.result.countPage;
            state.isFetching = false;
            state.errorMessage = null;
        },
        [getFreeListDBInfinity.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [getFreeListDBInfinity.rejected]: (
            state,
            { payload: errorMessage },
        ) => {
            state.isFetching = false;
            state.errorMessage = errorMessage;
        },
        //----

        [getSearchResult.fulfilled]: (state, { payload }) => {
            state.list = payload?.rows;
            state.pageCount = payload.countPage;
            state.isFetching = false;
            state.errorMessage = null;
        },

        //----자유게시판 특정 게시물 불러오는 리듀서
        [getFreePostDB.fulfilled]: (state, { payload }) => {
            state.post = payload;
            state.isFetching = false;
            state.errorMessage = null;
        },
        [getFreePostDB.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [getFreePostDB.rejected]: (state, { payload: errorMessage }) => {
            state.isFetching = false;
            state.errorMessage = errorMessage;
        },
        //----

        //----자유게시판 게시물 추가하는 리듀서
        [addFreePostDB.fulfilled]: (state, { payload }) => {
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
            state.post = payload;
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
            const freeBoardList = state.list.filter(
                post => post.post_id !== payload,
            );
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

        //----자유게시판 특정게시물 댓글목록 불러오는 리듀서
        [getFreeCommentListDB.fulfilled]: (state, { payload }) => {
            //payload에는 서버에서 가져온 댓글정보들이 들어있습니다.
            state.commentList = payload;
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

        //----자유게시판 특정댓글 추가하는 리듀서
        [addFreeCommentDB.fulfilled]: (state, { payload }) => {
            //payload에는 추가된 댓글정보가 들어있습니다.
            state.commentList.unshift(payload);
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

        //----자유게시판 특정댓글 수정하는 리듀서
        [editFreeCommentDB.fulfilled]: (state, { payload }) => {
            //payload에는 comment_id와 content가 들어있고, comment_id로 특정 댓글찾아서, content를 바꿔줍니다.
            let idx = state.commentList.findIndex(
                comment => comment.comment_id === payload.comment_id,
            );
            state.commentList[idx].content = payload.content;
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

        //----자유게시판 특정댓글 삭제하는 리듀서
        [deleteFreeCommentDB.fulfilled]: (state, { payload }) => {
            //payload에는 comment_id가 들어있고, 전체 state.list에서 comment_id가 포함되는 것을 빼고, state.list를 반환합니다.
            const freeBoardCommentList = state.commentList.filter(
                comment => comment.comment_id !== payload,
            );
            state.commentList = freeBoardCommentList;
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

        //----자유게시판 인기 게시물 불러오는 리듀서
        [getIssuePostListDB.fulfilled]: (state, { payload: issuePosts }) => {
            state.isFetching = false;
            state.issueList = issuePosts;
        },
        [getIssuePostListDB.pending]: (state, action) => {
            state.isFetching = true;
        },
        [getIssuePostListDB.rejected]: (state, { payload: errorMessage }) => {
            state.isFetching = false;
            state.errorMessage = errorMessage;
        },

        //----자유게시판 좋아요처리하는 리듀서
        [postLikeToggleDB.fulfilled]: (state, { payload: issuePosts }) => {
            state.isFetching = false;
        },
        [postLikeToggleDB.pending]: (state, action) => {
            state.isFetching = true;
        },
        [postLikeToggleDB.rejected]: (state, { payload: errorMessage }) => {
            state.isFetching = false;
            state.errorMessage = errorMessage;
        },
    },
});

export const {
    setCountryReducer,
    setTagReducer,
    resetTagReducer,
    setViewReducer,
    increaseLike,
    decreaseLike,
    setSearchOrder,
    resetSearchOrder,
    infinityPostCall,
} = freeBoardSlice.actions;

export default freeBoardSlice;
