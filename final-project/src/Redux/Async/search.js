import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchApi } from "../../Shared/api";
import Swal from "sweetalert2";

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
            Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
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
            Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
            thunkAPI.rejectWithValue(error.response.data.errorMessage);
        }
    },
);
