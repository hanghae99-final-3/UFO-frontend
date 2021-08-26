import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchApi } from "../../Shared/api";

/**
 * @author heesung
 * @param
 * @returns
 * @역할
 * @필수값
 */

export const getUnivSearchResult = createAsyncThunk(
    "search/getUnivSearchResult",
    async (data, thunkAPI) => {
        try {
            const response = await searchApi.searchUnivBySearchTerm(data);
            if (response.data.ok) {
                return response.data.result;
            }
        } catch (error) {
            thunkAPI.rejectWithValue(error.response.data.errorMessage);
        }
    },
);
