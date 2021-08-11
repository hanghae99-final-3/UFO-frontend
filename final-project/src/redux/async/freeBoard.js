import { createAsyncThunk } from "@reduxjs/toolkit";
import { history } from "../configureStore";
import { freeBoardApi } from "../../api";
import { freeCommentApi } from "../../api";
import moment from "moment";
import { increaseLike, decreaseLike } from "../modules/freeBoardSlice";
/**
 * @author kwonjiyeong
 * @param 없음
 * @returns 서버연결 성공시, 자유게시판의 목록 / 서버연결 실패시, 에러메세지
 * @역할 자유게시판 목록 불러오기
 * @필수값 없음
 */
export const getFreeListDB = createAsyncThunk(
    "freeBoard/getList",
    async (data, thunkAPI) => {
        try {
            const response = await freeBoardApi.getList(data);
            if (response.data.ok) return response.data.result;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);

/**
 * @author kwonjiyeong
 * @param 없음
 * @returns 서버연결 성공시, 자유게시판의 특정게시물 / 서버연결 실패시, 에러메세지
 * @역할 자유게시판 특정게시물 불러오기
 * @필수값 없음
 */
export const getFreePostDB = createAsyncThunk(
    "freeBoard/getPost",
    async (data, thunkAPI) => {
        try {
            const response = await freeBoardApi.getPost(data);
            if (response.data.ok)
                return { ...response.data.like, ...response.data.result };
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);

/**
 * @author kwonjiyeong
 * @param data = {user_id, category, country_id, title, content}
 * @returns 서버연결 성공시, 자유게시판 목록에 추가할 포스트 / 서버연결 실패시, 에러메세지
 * @역할 자유게시판 게시물 추가하기
 * @필수값 data
 */
export const addFreePostDB = createAsyncThunk(
    "freeBoard/addPost",
    async (data, thunkAPI) => {
        try {
            const response = await freeBoardApi.addPost(data);
            history.push("/freeboard");
            if (response.data.ok) return response.data.result;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);

/**
 * @author kwonjiyeong
 * @param data = {user_id, category, country_id, title, content}
 * @returns 서버연결 성공시, 자유게시판 목록에 추가할 포스트 / 서버연결 실패시, 에러메세지
 * @역할 자유게시판 특정 게시물 수정하기
 * @필수값 data
 */
export const editFreePostDB = createAsyncThunk(
    "freeBoard/editPost",
    async (data, thunkAPI) => {
        try {
            const response = await freeBoardApi.editPost(data);
            if (response.data.ok) {
                return response.data.result[0]; //서버에서 온 값이 배열로 묶여져서 들어와서 인덱스 처리했음.
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);

/**
 * @author kwonjiyeong
 * @param data = {post_id, user_id}
 * @returns 서버연결 성공시, 자유게시판 목록에서 삭제할 포스트 / 서버연결 실패시, 에러메세지
 * @역할 자유게시판 특정 게시물 삭제하기
 * @필수값 data
 */
export const deleteFreePostDB = createAsyncThunk(
    "freeBoard/deletePost",
    async (data, thunkAPI) => {
        try {
            const response = await freeBoardApi.deletePost(data);
            if (response.data.ok) {
                history.push("/freeboard");
                return data.post_id;
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);

/**
 * @author kwonjiyeong
 * @param postId : 댓글이 있는 post의 Id값.
 * @returns 서버연결 성공시, 자유게시판의 특정 게시물의 댓글목록 / 서버연결 실패시, 에러메세지
 * @역할 자유게시판의 특정 게시물의 댓글목록 불러오기
 * @필수값 postId
 */
export const getFreeCommentListDB = createAsyncThunk(
    "freeBoard/getCommentList",
    async (data, thunkAPI) => {
        try {
            const response = await freeCommentApi.getPostCommentList(data);
            if (response.data.ok) return response.data.result;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);

/**
 * @author kwonjiyeong
 * @param data = {user_id, content}
 * @returns 서버연결 성공시, 자유게시판 목록에 추가할 포스트 / 서버연결 실패시, 에러메세지
 * @역할 자유게시판 게시물 추가하기
 * @필수값 data
 */
export const addFreeCommentDB = createAsyncThunk(
    "freeBoard/addComment",
    async (data, thunkAPI) => {
        try {
            const response = await freeCommentApi.addPostComment(data);
            const user = thunkAPI.getState().user;
            if (response.data.ok)
                return {
                    ...response.data.result,
                    ...user,
                    createdAt: moment().format(`YYYY-MM-DD HH:mm:ss`), // 여기는 지영님 맘대로 하세요~~
                };
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);

/**
 * @author kwonjiyeong
 * @param data = {user_id, category, country_id, title, content}
 * @returns 서버연결 성공시, 자유게시판 목록에 추가할 포스트 / 서버연결 실패시, 에러메세지
 * @역할 자유게시판 특정 게시물 수정하기
 * @필수값 data
 */
export const editFreeCommentDB = createAsyncThunk(
    "freeBoard/editComment",
    async (data, thunkAPI) => {
        try {
            const response = await freeCommentApi.editPostComment(data);
            if (response.data.ok) {
                return response.data.result;
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);

/**
 * @author kwonjiyeong
 * @param data = {post_id, user_id}
 * @returns 서버연결 성공시, 자유게시판 목록에서 삭제할 포스트 / 서버연결 실패시, 에러메세지
 * @역할 자유게시판 특정 게시물 삭제하기
 * @필수값 data
 */
export const deleteFreeCommentDB = createAsyncThunk(
    "freeBoard/deleteComment",
    async (data, thunkAPI) => {
        try {
            const response = await freeCommentApi.deletePostComment(data);

            if (response.data.ok) {
                return data.comment_id;
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);

export const postLikeToggleDB = createAsyncThunk(
    "freeBoard/like/post",
    async (data, thunkAPI) => {
        try {
            const response = await freeBoardApi.postLikeToggle(data);
            if (response.data.ok) {
                if (response.data.message === "disliked post") {
                    //좋아요 취소
                    thunkAPI.dispatch(decreaseLike());
                } else {
                    //좋아요
                    thunkAPI.dispatch(increaseLike());
                }
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);
