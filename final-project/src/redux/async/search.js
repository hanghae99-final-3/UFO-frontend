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

export const getMainSearchResult = createAsyncThunk(
    "search/getMainSearchResult",
    async (data, thunkAPI) => {
        try {
            const response = await searchApi.searchMain(data);
            if (response.data.ok) {
                return response.data.result;
            }
        } catch (err) {
            thunkAPI.rejectWithValue(err.response.data.errorMessage);
        }
    },
);
