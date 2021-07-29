import { createSlice } from "@reduxjs/toolkit";
import { signupUserDB, loginUserDB } from "../async/user";

/**
 * @initialState 사용자 정보
 * @역할 로그인 / 회원가입시  유저 상태 업데이트
 */

const initialState = {
    user: {},
    isFetching: false,
    isLoggedIn: false,
    errorMessage: "",
    isSignupSuccess: "",
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        //회원가입 성공, 로그인 창으로 이동후 회원가입 상태 초기화
        resetSignupSuccess: state => {
            state.isSignupSuccess = "";
        },
    },
    extraReducers: {
        //┏---------------회원가입 Reducer-----------------------┓
        [signupUserDB.pending]: (state, action) => {
            state.isFetching = true;
        },
        [signupUserDB.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.errorMessage = "";
            state.isSignupSuccess = payload;
        },
        [signupUserDB.rejected]: (state, { payload: errorMessage }) => {
            state.errorMessage = errorMessage;
            state.isFetching = false;
        },
        //--------------------------------------------------------
        //┏-----------------로그인 Reducer----------------------┓
        [loginUserDB.pending]: (state, action) => {
            state.isFetching = true;
        },
        [loginUserDB.fulfilled]: (state, { payload: user }) => {
            state.isFetching = false;
            state.user = user;
            state.errorMessage = "";
        },
        [loginUserDB.rejected]: (state, { payload: errorMessage }) => {
            state.isFetching = false;
            state.errorMessage = errorMessage;
        },
        //--------------------------------------------------------
    },
});

export const { resetSignupSuccess } = userSlice.actions;

export default userSlice;
