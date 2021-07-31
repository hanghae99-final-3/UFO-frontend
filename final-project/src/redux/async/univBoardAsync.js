import { createAsyncThunk } from "@reduxjs/toolkit";
import { univBoardApi } from "../../api";

//const axios = () => {}; // template 예제를 위한 임의의 함수, 무시

// createAsyncThunk API로 비동기 액션을 만들면 이 액션에 대해 pending, fulfilled, rejected 상태에 대한 액션이 자동으로 생성된다.

//UnivBoard 목록 불러오기=>슬라이스로 보내고.
export const getUnivBoardDB = createAsyncThunk(
    "univBoard/getUnivList",
    async (data, thunkAPI) => {
        try {
            const response = await univBoardApi.getList();
            console.log("response", response);
            if (response.data.ok) {
                return response.data.result;
            }
        } catch (err) {
            console.log(err);
        }
    },
);

//UnivBoard List 추가하기
export const addUnivBoardPostDB = createAsyncThunk(
    "univBoard/addUnivList",
    async (data, thunkAPI) => {
        const response = await univBoardApi.addPost(data);
        if (response.data.ok) {
            const newPost = response.data.result;
            return newPost;
        }
    },
);

//UnivBoard 상세보기
export const detailUnivBoardDB = createAsyncThunk(
    "univBoard/post/detail",
    async (data, thunkAPI) => {
        const response = await univBoardApi.getPost(data);
        console.log("response", response);
        return response.data.result;
    },
);

//만들어진 비동기 액션에 대한 리듀서는 Slice의 extraReducer 부분에서 작성할 수 있다.
