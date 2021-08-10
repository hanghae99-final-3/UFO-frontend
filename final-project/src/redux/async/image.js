import { createAsyncThunk } from "@reduxjs/toolkit";
import { history } from "../configureStore";
import { imageApi } from "../../api";

/**
 * @author kwonjiyeong
 * @param data : {image: 파일객체}
 * @returns 서버연결 성공시, 단일 이미지 url / 서버연결 실패시, 에러메세지
 * @역할 서버에 이미지파일객체를 보내고, 단일 이미지 url 받아오기
 * @필수값 없음
 */
export const uploadImageDB = createAsyncThunk(
    "image/uploadImage",
    async (data, thunkAPI) => {
        try {
            const response = await imageApi.uploadImage(data);
            if (response.data.ok) return response.data.result;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);

/**
 * @author kwonjiyeong
 * @param data : {image: 파일객체, currentIdx:url을 넣어줘야하는 array의 인덱스번호}
 * @returns 서버연결 성공시, 대량 이미지 url / 서버연결 실패시, 에러메세지
 * @역할 서버에 array 형태로 이미지파일객체들을 보내고, 이미지 url들을 받아오기
 * @필수값 없음
 */
export const uploadImagesDB = createAsyncThunk(
    "image/uploadImages",
    async (data, thunkAPI) => {
        try {
            const response = await imageApi.uploadImages(data);
            if (response.data.ok) return response.data.result;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);
