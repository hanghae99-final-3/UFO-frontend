import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchApi } from "../../api";
import { history } from "../configureStore";

/**
 * @author heesung
 * @param
 * @returns
 * @역할
 * @필수값
 */

export const getSearchResult = createAsyncThunk(
    "freeBoard/getList",
    async (data, thunkAPI) => {
        try {
            const response = await searchApi.searchBySearchTerm(data);
            if (response.data.ok) {
                return response.data.result;
            }
        } catch (error) {
            thunkAPI.rejectWithValue(error.response.data.errorMessage);
        }
    },
);
