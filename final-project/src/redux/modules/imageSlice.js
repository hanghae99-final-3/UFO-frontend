import { createSlice } from "@reduxjs/toolkit";
import { uploadImageDB, uploadImagesDB } from "../async/image";

/**
 * @initialState list:이미지 리스트, isFetching:이미지를 업로드 중인가, errorMessage: 에러메세지
 * @역할 이미지 업로드 후, 이미지에 대한 url을 리스트에 반환
 */

const initialState = {
    list: [],
    isFetching: false,
    errorMessage: null,
};

const imageSlice = createSlice({
    name: "freeBoard",
    initialState: initialState,
    reducers: {
        setCountryReducer: (state, { payload: countryId }) => {
            state.selectedCountry = countryId;
        },
        setTagReducer: (state, { payload }) => {
            state.selectedTag = payload;
        },
        resetTagReducer: (state, action) => {
            state.selectedTag = null;
        },
        setViewReducer: (state, action) => {
            if (state.post) state.post.view_count += 1;
        },
    },
    extraReducers: {
        //----단일 이미지를 업로드하는 리듀서
        [uploadImageDB.fulfilled]: (state, { payload }) => {
            state.list = payload;
            state.isFetching = false;
            state.errorMessage = null;
        },
        [uploadImageDB.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [uploadImageDB.rejected]: (state, { payload: errorMessage }) => {
            state.isFetching = false;
            state.errorMessage = errorMessage;
        },
        //----

        //----이미지를 대량 업로드하는 리듀서
        [uploadImagesDB.fulfilled]: (state, { payload }) => {
            state.list = payload;
            state.isFetching = false;
            state.errorMessage = null;
        },
        [uploadImagesDB.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [uploadImagesDB.rejected]: (state, { payload: errorMessage }) => {
            state.isFetching = false;
            state.errorMessage = errorMessage;
        },
        //----
    },
});

export const {} = imageSlice.actions;

export default imageSlice;
