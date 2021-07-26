import { createAsyncThunk } from "@reduxjs/toolkit";

const axios = () => {}; // template 예제를 위한 임의의 함수, 무시

// createAsyncThunk API로 비동기 액션을 만들면 이 액션에 대해 pending, fulfilled, rejected 상태에 대한 액션이 자동으로 생성된다.

export const getTemplates = createAsyncThunk(
    "template/list",
    async (data, thunkAPI) => {
        const response = await axios({
            url: "endpoint/templates",
            method: "get",
        });
        return response.json;
    },
);

//만들어진 비동기 액션에 대한 리듀서는 Slice의 extraReducer 부분에서 작성할 수 있다.
