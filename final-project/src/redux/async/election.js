import { createAsyncThunk } from "@reduxjs/toolkit";
import { history } from "../configureStore";
import { electionApi } from "../../api";
import axios from "axios";
import { getToken } from "../../utils";

/**
 * @author kwonjiyeong
 * @param 없음
 * @returns 서버연결 성공시, 선거게시글 목록 / 서버연결 실패시, 에러메세지
 * @역할 선거게시글 목록 불러오기
 * @필수값 없음
 */
export const getElectionListDB = createAsyncThunk(
    "election/getList",
    async (data, thunkAPI) => {
        try {
            const response = await electionApi.getElectionList();
            if (response.data.ok) return response.data.result;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);

/**
 * @author kwonjiyeong
 * @param data = election_id
 * @returns 서버연결 성공시, 특정 선거게시글 / 서버연결 실패시, 에러메세지
 * @역할 특정 선거게시글 불러오기
 * @필수값 없음
 */
export const getElectionDB = createAsyncThunk(
    "election/getPost",
    async (data, thunkAPI) => {
        try {
            const response = await electionApi.getElection(data);
            if (response.data.ok) return response.data.result;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);

/**
 * @author kwonjiyeong
 * @param data = election_id
 * @returns 서버연결 성공시, 특정 선거게시글 삭제 / 서버연결 실패시, 에러메세지
 * @역할 특정게시글 삭제하기
 * @필수값 없음
 */
export const deleteElectionDB = createAsyncThunk(
    "election/deletePost",
    async (data, thunkAPI) => {
        try {
            const response = await electionApi.deleteElection(data);
            if (response.data.ok) history.push("/election");
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);

/**
 * @author kwonjiyeong
 * @param data = election_id
 * @returns 서버연결 성공시, 특정 선거게시글 삭제 / 서버연결 실패시, 에러메세지
 * @역할 특정게시글 삭제하기
 * @필수값 없음
 */
// export const addElectionDB = createAsyncThunk(
//     "election/deletePost",
//     async (data, thunkAPI) => {
//         try {
//             const response = await electionApi.addElection(data);
//             if (response.data.ok) {
//                 return response.data.result;
//             }
//         } catch (err) {
//             return thunkAPI.rejectWithValue(err.response.message);
//         }
//     },
// );

export const addElectionDB = createAsyncThunk(
    "election/addPost",
    async (data, thunkAPI) => {
        //multer를 사용하려면 formData 안에 request들을 넣어주어야 한다
        let formData = new FormData();

        function setFormData(formData, data, parentKey) {
            if (!(formData instanceof FormData)) return;
            if (!(data instanceof Object)) return;
            Object.keys(data).forEach(key => {
                const val = data[key];
                if (parentKey) key = `${parentKey}[${key}]`;
                if (val instanceof Object && !Array.isArray(val)) {
                    return setFormData(formData, val, key);
                }
                if (Array.isArray(val)) {
                    val.forEach((v, idx) => {
                        if (v instanceof Object) {
                            setFormData(formData, v, `${key}[${idx}]`);
                        } else {
                            formData.append(`${key}[${idx}]`, v);
                        }
                    });
                } else {
                    formData.append(key, val);
                }
            });
        }
        setFormData(formData, data);
        const arrQueryString = [];
        for (let pair of formData.entries()) {
            console.log(`${pair[0]} = ${pair[1]}`);
            arrQueryString.push(`${pair[0]}=${pair[1]}`);
        }

        // for (let entry of Object.entries(data)) {
        //     formData.append(entry[0], entry[1]);
        // }

        //통신헤더설정
        const config = {
            headers: {
                "content-type": "multipart/form-data",
                authorization: await getToken(),
            },
        };

        try {
            const response = await axios.post(
                "http://3.36.90.60/election",
                formData,
                config,
            );
            if (response.data.ok) {
                return response.data.result;
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);
