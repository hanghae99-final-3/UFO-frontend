import { createAsyncThunk } from "@reduxjs/toolkit";
import { history } from "../configureStore";
import { electionApi } from "../../api";

/**
 * @author kwonjiyeong
 * @param 없음
 * @returns 서버연결 성공시, 투표게시판의 목록 / 서버연결 실패시, 에러메세지
 * @역할 투표게시판 목록 불러오기
 * @필수값 없음
 */
export const getElectionListDB = createAsyncThunk(
    "election/getList",
    async (data, thunkAPI) => {
        try {
            const response = await electionApi.getElectionListDB();
            console.log(response);
            if (response.data.ok) return response.data.result;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);
