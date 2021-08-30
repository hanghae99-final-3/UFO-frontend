import { createSlice } from "@reduxjs/toolkit";
import {
    signupUserDB,
    loginUserDB,
    checkLoggedInUser,
    editUserProfileDB,
    deleteAccountDB,
    checkAdminDB,
} from "../Async/user";

import { getDarkTheme } from "../../Shared/utils";

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
    isAdmin: false,
    isDarkTheme: Boolean(getDarkTheme()),
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        //회원가입 성공, 로그인 창으로 이동후 회원가입 상태 초기화
        resetSignupSuccess: state => {
            state.isSignupSuccess = "";
        },
        logoutUser: state => {
            state.user = {};
            state.isLoggedIn = false;
        },
        updateUsername: (state, action) => {
            state.user.nickname = action.payload;
        },
        setDarkTheme: (state, action) => {
            state.isDarkTheme = action.payload;
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
            state.isLoggedIn = true;
            state.errorMessage = "";
        },
        [loginUserDB.rejected]: (state, { payload: errorMessage }) => {
            state.isFetching = false;
            state.errorMessage = errorMessage;
        },
        //--------------------------------------------------------
        //┏-----------------로그인 체크 Reducer----------------------┓
        [checkLoggedInUser.pending]: (state, action) => {
            state.isFetching = true;
        },
        [checkLoggedInUser.fulfilled]: (
            state,
            { payload: { password, ...user } },
        ) => {
            state.isFetching = false;
            state.user = user;
            state.isLoggedIn = true;
            state.errorMessage = "";
        },
        [checkLoggedInUser.rejected]: (state, { payload: errorMessage }) => {
            state.isFetching = false;
            state.errorMessage = errorMessage;
        },
        //--------------------------------------------------------
        //┏-----------------유저 프로필 정보 수정 Reducer----------------------┓
        [editUserProfileDB.pending]: (state, action) => {
            state.isFetching = true;
        },
        [editUserProfileDB.fulfilled]: (state, { payload: updatedUser }) => {
            state.isFetching = false;
            state.user = updatedUser;
            state.errorMessage = "";
        },
        [editUserProfileDB.rejected]: (state, { payload: errorMessage }) => {
            state.isFetching = false;
            state.errorMessage = errorMessage;
        },
        [deleteAccountDB.fulfilled]: (state, action) => {
            state.user = {};
            state.isLoggedIn = false;
        },
        [checkAdminDB.fulfilled]: (state, { payload: isAdmin }) => {
            state.isAdmin = isAdmin;
        },
    },
});

export const { resetSignupSuccess, logoutUser, updateUsername, setDarkTheme } =
    userSlice.actions;

export default userSlice;
