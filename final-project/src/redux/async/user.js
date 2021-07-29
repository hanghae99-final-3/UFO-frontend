import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../../Api";
import jwt from "jwt-decode";

/**
 * @author jangheesung
 * @param data= {email, nickname, password}
 * @returns 성공시 회원가입 / 실패시, 에러메세지 반환
 * @역할 유저 회원가입
 * @필수값 data
 */
export const signupUserDB = createAsyncThunk(
    "user/signup",
    async (data, thunkAPI) => {
        try {
            //회원가입 요청 api
            const response = await userApi.signup(data);
            if (response.data.ok) {
                // 회원가입 성공시 리듀서로 성공 여부 반환
                return true;
            }
        } catch (error) {
            // 에러 메세지 반환
            if (!error.response.data.ok) {
                // 이메일 중복 등  서버 pre set 에러 메세지 반환
                return thunkAPI.rejectWithValue(error.response.data.message);
            } else {
                // 서버 또는 api 통신중 발생하는 에러 메세지 반환
                return thunkAPI.rejectWithValue(error.response.errorMessage);
            }
        }
    },
);

/**
 * @author jangheesung
 * @param data= {email, password}
 * @returns 성공시 유저 정보 반환 / 실패시 에러메세지 반환
 * @역할 유저 로그인
 * @필수값 data
 */
export const loginUserDB = createAsyncThunk(
    "user/login",
    async (data, thunkAPI) => {
        try {
            //로그인 요청이후 성공시 jwt 토큰을 발급 받는다.
            const response = await userApi.login(data);
            if (response.data.message === "success") {
                //로컬 스토리지에 토큰 저장
                localStorage.setItem("token", response.data.token);
                const { user_id: userId } = jwt(response.data.token);

                //토큰의 유저 아이디로 유저 정보 api 호출, 반환받은 데이터 redux state에 update
                const getUserResponse = await userApi.getUser(userId);
                if (getUserResponse.data.ok) {
                    const user = getUserResponse.data.result;
                    return user;
                } else {
                    // 서버 로그인 실패 에러 메세지 반환
                    return thunkAPI.rejectWithValue(
                        getUserResponse.data.errorMessage,
                    );
                }
            }
        } catch (error) {
            // api요청중 일어나는 에러 메세지 반환
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    },
);

//카카오 로그인 미들웨어
export const kakaoLogin = createAsyncThunk(
    "user/kakao",
    async (data, thunkAPI) => {
        await userApi.kakaoLogin();
    },
);
