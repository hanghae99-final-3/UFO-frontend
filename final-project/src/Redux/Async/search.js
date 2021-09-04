import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchApi } from "../../Shared/api";
import Swal from "sweetalert2";

//error loging
import * as Sentry from "@sentry/react";

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
        } catch (err) {
            Sentry.captureException(`error, 통합검색결과 로드 : ${err}`);
            thunkAPI.rejectWithValue(err.response.data.errorMessage);
            Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
        }
    },
);
