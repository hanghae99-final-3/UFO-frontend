import { createAsyncThunk } from "@reduxjs/toolkit";
import { history } from "../configureStore";
import { freeBoardApi } from "../../api";

/**
 * @author kwonjiyeong
 * @param postId : 댓글이 있는 post의 Id값.
 * @returns 서버연결 성공시, 자유게시판의 특정 게시물의 댓글목록 / 서버연결 실패시, 에러메세지
 * @역할 자유게시판의 특정 게시물의 댓글목록 불러오기
 * @필수값 postId
 */
export const getFreeCommentListDB = createAsyncThunk(
    "comment/getList",
    async (data, thunkAPI) => {
        try {
            const response = await freeBoardApi.getPostCommentList(data);
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
    "comment/addComment",
    async (data, thunkAPI) => {
        try {
            const response = await freeBoardApi.addPostComment(data);
            const user = thunkAPI.getState().user;
            if (response.data.ok) return { ...response.data.result, ...user };
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
    "comment/editComment",
    async (data, thunkAPI) => {
        try {
            const response = await freeBoardApi.editPostComment(data);
            if (response.data.ok) {
                return { comment_id: data.comment_id, content: data.content }; //서버에서 넘겨지는 값이 없어서 임시조치!
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
    "comment/deleteComment",
    async (data, thunkAPI) => {
        try {
            const response = await freeBoardApi.deletePostComment(data);

            if (response.data.ok) {
                return data.comment_id;
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);
