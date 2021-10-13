import { createAsyncThunk } from "@reduxjs/toolkit";
import { history } from "../configureStore";
import { electionApi, voteApi, CongratulationApi } from "../../Shared/api";

//error loging
import * as Sentry from "@sentry/react";

//alert
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
            if (response.data.ok) return response.data.result;
        } catch (err) {
            Sentry.captureException(`error, 선거게시글목록 로드 : ${err}`);
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
            Sentry.captureException(`error, 특정 선거게시글 로드 : ${err}`);
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
            Sentry.captureException(`error, 선거게시글 추가 : ${err}`);
            Swal.fire("오류", "게시글을 추가할 수 없어요!", "error");
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);

export const editElectionDB = createAsyncThunk(
    "election/editPost",
    async (data, thunkAPI) => {
        try {
            const response = await electionApi.editElection(data);
            if (response.data.ok) {
                // 선거가 수정되면 추가가된 선거게시글 상세페이지로 간다.
                const electionId = data.election_id;
                Swal.fire("완료", "정상적으로 수정되었습니다.", "success");
                return history.push(`/election/detail/${electionId}`);
            }
        } catch (err) {
            Sentry.captureException(`error, 선거게시글 수정 : ${err}`);
            Swal.fire("오류", "게시글을 수정할 수 없어요!", "error");
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
                return data.election_id;
            }
        } catch (err) {
            Sentry.captureException(`error, 선거게시글 삭제 : ${err}`);
            Swal.fire("에러", "게시글을 삭제할 수 없어요!", "error");
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);

/**
 * @author kwonjiyeong
 * @param data = election_id
 * @returns 서버연결 성공시, 투표추가 / 서버연결 실패시, 에러메세지
 * @역할 투표하기
 * @필수값 없음
 */
export const addVoteDB = createAsyncThunk(
    "election/addVote",
    async (data, thunkAPI) => {
        try {
            const response = await voteApi.addVote(data);
            if (response.data.ok) {
                Swal.fire(
                    "완료",
                    "투표가 정상적으로 반영되었습니다.",
                    "success",
                );
                history.push("/election");
            }
        } catch (err) {
            Sentry.captureException(`error, 투표 추가 : ${err}`);
            Swal.fire("에러", "투표가 처리되지 않았습니다.", "error");
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);

/**
 * @author kwonjiyeong
 * @param data = election_id
 * @returns 서버연결 성공시, 특정 선거게시글 결과값 / 서버연결 실패시, 에러메세지
 * @역할 특정 선거게시글 결과값 불러오기
 * @필수값 없음
 */
export const getElectionResultDB = createAsyncThunk(
    "election/getResult",
    async (data, thunkAPI) => {
        try {
            const response = await voteApi.getResult(data);
            if (response.data.ok) return response.data.result;
        } catch (err) {
            Sentry.captureException(`error, 선거결과 로드 : ${err}`);
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);

/**
 * @author kwonjiyeong
 * @param data = election_id
 * @returns 서버연결 성공시, 특정 선거게시글 당선축하메세지목록 / 서버연결 실패시, 에러메세지
 * @역할 특정 선거게시글 당선축하메세지목록 불러오기
 * @필수값 없음
 */
export const getCongratulationDB = createAsyncThunk(
    "election/getCongratulation",
    async (data, thunkAPI) => {
        try {
            const response = await CongratulationApi.getCongratulation(data);
            if (response.data.ok) return response.data.result;
        } catch (err) {
            Sentry.captureException(
                `error, 당선자 축하메세지목록 로드 : ${err}`,
            );
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);

/**
 * @author kwonjiyeong
 * @param data = election_id
 * @returns 서버연결 성공시, 특정 선거게시글 당선축하메세지 추가 / 서버연결 실패시, 에러메세지
 * @역할 특정 선거게시글 당선축하메세지목록 추가하기
 * @필수값 없음
 */
export const addCongratulationDB = createAsyncThunk(
    "election/addCongratulation",
    async (data, thunkAPI) => {
        try {
            const response = await CongratulationApi.addCongratulation(data);
            const user = thunkAPI.getState().user;
            if (response.data.ok) return { ...response.data.result, ...user };
        } catch (err) {
            Sentry.captureException(`error, 당선자 축하메세지 추가 : ${err}`);
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);

/**
 * @author kwonjiyeong
 * @param data = election_id
 * @returns 서버연결 성공시, 특정 선거게시글 당선축하메세지 수정 / 서버연결 실패시, 에러메세지
 * @역할 특정 선거게시글 당선축하메세지목록 수정하기
 * @필수값 없음
 */
export const editCongratulationDB = createAsyncThunk(
    "election/editCongratulation",
    async (data, thunkAPI) => {
        try {
            const response = await CongratulationApi.editCongratulation(data);
            if (response.data.ok) return response.data.result;
        } catch (err) {
            Sentry.captureException(`error, 당선자 축하메세지 수정 : ${err}`);
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);
/**
 * @author kwonjiyeong
 * @param data = election_id
 * @returns 서버연결 성공시, 특정 선거게시글 당선축하메세지삭제하기 / 서버연결 실패시, 에러메세지
 * @역할 특정 선거게시글 당선축하메세지 삭제하기
 * @필수값 없음
 */
export const deleteCongratulationDB = createAsyncThunk(
    "election/deleteCongratulation",
    async (data, thunkAPI) => {
        try {
            const response = await CongratulationApi.deleteCongratulation(data);
            if (response.data.ok) return data.comment_id;
        } catch (err) {
            Sentry.captureException(`error, 당선자 축하메세지 삭제 : ${err}`);
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);
