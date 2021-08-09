import { createAsyncThunk } from "@reduxjs/toolkit";
import { history } from "../configureStore";
import { electionApi } from "../../api";

/**
 * @author kwonjiyeong
 * @param 없음
 * @returns 서버연결 성공시, 선거게시글 목록 / 서버연결 실패시, 에러메세지
 * @역할 선거게시글 목록 불러오기
 * @필수값 없음
 */
export const getElectionListDB = createAsyncThunk(
    "election/getList",
    async (data, thunkAPI) => {
        try {
            const response = await electionApi.getElectionList();
            if (response.data.ok) return response.data.result;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);

/**
 * @author kwonjiyeong
 * @param data = election_id
 * @returns 서버연결 성공시, 특정 선거게시글 / 서버연결 실패시, 에러메세지
 * @역할 특정 선거게시글 불러오기
 * @필수값 없음
 */
export const getElectionDB = createAsyncThunk(
    "election/getPost",
    async (data, thunkAPI) => {
        try {
            const response = await electionApi.getElection(data);
            console.log(response);
            if (response.data.ok) return response.data.result;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);

/**
 * @author kwonjiyeong
 * @param data = election_id
 * @returns 서버연결 성공시, 특정 선거게시글 삭제 / 서버연결 실패시, 에러메세지
 * @역할 특정게시글 삭제하기
 * @필수값 없음
 */
export const deleteElectionDB = createAsyncThunk(
    "election/deletePost",
    async (data, thunkAPI) => {
        try {
            const response = await electionApi.deleteElection(data);
            if (response.data.ok) history.push("/election");
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);
