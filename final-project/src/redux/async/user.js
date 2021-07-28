import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../../api";

//회원가입 미들웨어
export const signupUserDB = createAsyncThunk(
    "user/signup",
    async (data, thunkAPI) => {
        try {
            //회원가입 axios 요청
            const response = await userApi.signup(data);
            if (response.data.ok) {
                return data;
            }
        } catch (err) {
            //서버에러 반환시 에러 메세지 slice reducer로 반환
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    },
);

//로그인 미들웨어
export const loginUserDB = createAsyncThunk(
    "user/login",
    async (data, thunkAPI) => {
        try {
            const response = await userApi.login(data);
            if (response.data.ok) {
                return response.data.result;
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    },
);
