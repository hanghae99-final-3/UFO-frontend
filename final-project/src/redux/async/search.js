import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchApi } from "../../api";

/**
 * @author heesung
 * @param
 * @returns
 * @역할
 * @필수값
 */

export const getSearchResult = createAsyncThunk(
    "search/getSearchResult",
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
