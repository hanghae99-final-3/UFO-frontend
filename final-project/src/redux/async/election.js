import { createAsyncThunk } from "@reduxjs/toolkit";
import { history } from "../configureStore";
import { electionApi } from "../../api";

//통신결과에 따른 후처리를 위한 alert 라이브러리
import Swal from "sweetalert2";

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
            console.log(response);
            console.log(!response.data.result[0].votes);
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
 * @returns 서버연결 성공시, 선거게시글 추가 / 서버연결 실패시, 에러메세지
 * @역할 선거게시글 추가하기
 * @필수값 없음
 */

export const addElectionDB = createAsyncThunk(
    "election/addPost",
    async (data, thunkAPI) => {
        try {
            const response = await electionApi.addElection(data);
            if (response.data.ok) {
                // 선거가 추가되면 추가가된 선거게시글 상세페이지로 간다.
                const electionId = response.data.result.election_id;
                if (response.data.ok)
                    Swal.fire(
                        "완료",
                        "정상적으로 추가가 되었습니다.",
                        "success",
                    );
                history.push(`/election/detail/${electionId}`);
                return response.data.result;
            }
        } catch (err) {
            Swal.fire("오류", "게시글을 추가할 수 없어요!", "error");
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);

/**
 * @author kwonjiyeong
 * @param data = election_id
 * @returns 서버연결 성공시, 특정 선거게시글 삭제 / 서버연결 실패시, 에러메세지
 * @역할 특정선거게시글 삭제하기
 * @필수값 없음
 */
export const deleteElectionDB = createAsyncThunk(
    "election/deletePost",
    async (data, thunkAPI) => {
        try {
            const response = await electionApi.deleteElection(data);
            if (response.data.ok) {
                Swal.fire("완료", "정상적으로 삭제가 되었습니다.", "success");
                history.push("/election");
            }
        } catch (err) {
            Swal.fire("에러", "게시글을 삭제할 수 없어요!", "error");
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);
