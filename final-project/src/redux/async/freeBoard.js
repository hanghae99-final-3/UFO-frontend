import { createAsyncThunk } from "@reduxjs/toolkit";
import { history } from "../configureStore";
import { freeBoardApi } from "../../api";

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
            const response = await freeBoardApi.getList();
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
 * @역할 자유게시판 게시물 추가하기
 * @필수값 data
 */
export const addFreePostDB = createAsyncThunk(
    "freeBoard/addList",
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
                history.push("/freeboard");
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
//만들어진 비동기 액션에 대한 리듀서는 Slice의 extraReducer 부분에서 작성할 수 있다.
