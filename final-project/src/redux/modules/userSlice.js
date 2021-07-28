import { createSlice } from "@reduxjs/toolkit";
import { signupUserDB } from "../async/user";

/**
 * @initialState 사용자 정보
 * @역할 로그인 / 회원가입시  유저 상태 업데이트
 */

const initialState = {
    user: {},
    errorMessage: "",
    isFetching: false,
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [signupUserDB.pending]: (state, action) => {
            state.isFetching = true;
        },
        [signupUserDB.fulfilled]: (state, { payload: user }) => {
            state.user = user;
            state.isFetching = false;
            state.errorMessage = "";
        },
        [signupUserDB.rejected]: (state, { payload: errorMessage }) => {
            state.errorMessage = errorMessage;
            state.isFetching = false;
        },
    },
});

export default userSlice;
