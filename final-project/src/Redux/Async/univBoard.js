import { createAsyncThunk } from "@reduxjs/toolkit";
import { univBoardApi } from "../../Shared/api";
import { history } from "../configureStore";
import { increaseLike, decreaseLike } from "../Modules/univBoardSlice";
/**
 * @author heesung & junghoo
 * @param none
 * @returns 대학교 게시판 게시글
 * @역할 대학 게시판 게시물 불러오기
 * @필수값 none
 */
export const getUnivBoardDB = createAsyncThunk(
    "univBoard/getUnivList",
    async (data, thunkAPI) => {
        try {
            // 게시물 조회 요청
            const response = await univBoardApi.getList(data);
            if (response.data.ok) {
                return response.data;
            } else if (!response.data.ok) {
                return thunkAPI.rejectWithValue(response.data.message);
            }
        } catch (error) {
            Swal.fire(
                "에러",
                "네트워크 오류가 발생했습니다. 다시 시도해주세요",
                "error",
            );
            history.push("/");
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    },
);

/**
 * @author heesung & junghoo & jiyeong
 * @param data = { title, content,category, userId, is_fixed, univ_id }
 * @returns 생성된 게시물 정보
 * @역할 대학 게시판 게시물 생성
 * @필수값 data
 */
export const addUnivBoardPostDB = createAsyncThunk(
    "univBoard/addUnivList",
    async (data, thunkAPI) => {
        try {
            // 게시물 생성 api 요청
            const response = await univBoardApi.addPost(data);
            if (response.data.ok) {
                // 게시물 생성 성공시 새롭게 생성된 게시물 정보 반환
                const newPost = response.data.result;
                return newPost;
            } else if (!response.data.ok) {
                return thunkAPI.rejectWithValue(response.data.message);
            }
        } catch (error) {
            Swal.fire("에러", "인증된 회원만 사용 가능합니다.", "error");
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    },
);

/**
 * @author heesung & junghoo & jiyeong
 * @param data = {title, content,category, userId, is_fixed univ_id}
 * @returns 수정 게시물 정보
 * @역할 대학 게시판 게시물 수정
 * @필수값 data
 */
export const editUnivBoardPostDB = createAsyncThunk(
    "univBoard/editUnivList",
    async (data, thunkAPI) => {
        try {
            // 대학 게시판 게시물 수정 요청
            const response = await univBoardApi.editPost(data);
            if (response.data.ok) {
                //성공시 수정된 게시물 정보 반환
                return response.data.result;
            } else if (!response.data.ok) {
                return thunkAPI.rejectWithValue(response.data.message);
            }
        } catch (error) {
            Swal.fire(
                "에러",
                "게시글 수정에 실패하였습니다. 다시 시도해주세요!",
                "error",
            );

            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    },
);

/**
 * @author heesung & junghoo
 * @param data = post_id
 * @returns 게시글 상세 정보
 * @역할 대학 게시판 게시물 상세 정보 불러오기
 * @필수값 data
 */
export const detailUnivBoardPostDB = createAsyncThunk(
    "univBoard/post/detail",
    async (data, thunkAPI) => {
        try {
            // 대학 게시판 게시물 상세정보 요청
            const response = await univBoardApi.getPostDetail(data);
            if (response.data.ok) {
                return { ...response.data.like, ...response.data.result };
            }
        } catch (error) {
            Swal.fire(
                "에러",
                "네트워크 오류가 발생했습니다. 다시 시도해주세요!",
                "error",
            );
            history.push("/univboard");
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    },
);

/**
 * @author heesung & junghoo & jiyeong
 * @param data = userId, postId
 * @returns status message
 * @역할 대학교 게시판 게시글 삭제
 * @필수값 data
 */
export const deleteUnivBoardPostDB = createAsyncThunk(
    "univBoard/delete/post",
    async (data, thunkAPI) => {
        try {
            // 대학교 게시판 게시글 삭제 요청
            const response = await univBoardApi.deletePost(data);
            if (response.data.ok) {
                // 요청 성공시 redux 게시글 리스트 최신화
                history.push("/univboard");
            } else if (!response.data.ok) {
                // 삭제 실패시  에러 메세지 반환
                return thunkAPI.rejectWithValue(response.data.message);
            }
        } catch (error) {
            // 요청 및 서버 에러 반환
            Swal.fire(
                "에러",
                "게시글 삭제에 실패하였습니다. 다시 시도해주세요!",
                "error",
            );

            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    },
);

/**
 * @author heesung & junghoo
 * @param data = postId
 * @returns 해당 게시물의 모든 댓글 (배열)
 * @역할 게시글의 달린 댓글 불러온다.
 * @필수값 data = 게시글 아이디
 */
export const getUnivBoardCommentDB = createAsyncThunk(
    "univBoard/get/comment",
    async (post_id, thunkAPI) => {
        try {
            // 게시글의 댓글 요청
            const response = await univBoardApi.getComment(post_id);
            if (response.data.ok) {
                // 요청 성공시 댓글 리스트(배열) 반환
                return response.data.result;
            }
        } catch (error) {
            Swal.fire(
                "에러",
                "네트워크 오류가 발생했습니다. 다시 시도해주세요!",
                "error",
            );
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    },
);

/**
 * @author heesung & junghoo & jiyeong
 * @param data = postId, userId, content
 * @returns 상태 메세지
 * @역할 대학 게시판 게시물 댓글 생성
 * @필수값 data
 */
export const addUnivBoardCommentDB = createAsyncThunk(
    "univBoard/add/comment",
    async (data, thunkAPI) => {
        try {
            // 댓글 생성 요청
            const response = await univBoardApi.addComment(data);
            const postId = response.data.result.post_id;
            if (response.data.ok) {
                // 요청 성공시 댓글 리스트 최신화
                thunkAPI.dispatch(getUnivBoardCommentDB(postId));
            } else if (!response.data.ok) {
                // 댓글 작성 실패시 메세지 반환
                return thunkAPI.rejectWithValue(response.data.message);
            }
        } catch (error) {
            Swal.fire(
                "에러",
                "게시글 등록에 실패하였습니다. 다시 시도해주세요!",
                "error",
            );
            return thunkAPI.rejectWithValue(error.response.data.errorMessage);
        }
    },
);

/**
 * @author heesung & junghoo & jiyeong
 * @param data = commentId, user_id, content, post_id
 * @returns 상태 메세지
 * @역할 대학 게시판 게시물 댓글 수정
 * @필수값 data
 */
export const editUnivBoardCommentDB = createAsyncThunk(
    "univBoard/edit/comment",
    async (data, thunkAPI) => {
        try {
            const response = await univBoardApi.editComment(data);
            if (response.data.ok) {
                thunkAPI.dispatch(getUnivBoardCommentDB(data.post_id));
            } else if (!response.data.ok) {
                return thunkAPI.rejectWithValue(response.data.message);
            }
        } catch (error) {
            return Swal.fire(
                "에러",
                "댓글 수정에 실패하였습니다. 다시 시도해주세요.",
                "error",
            );
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    },
);

/**
 * @author heesung & junghoo & jiyeong
 * @param data = commentId, userId
 * @returns 댓글 삭제후 해당 댓글이 제거된 댓글 리스트 배열 반환
 * @역할 게시물 댓글 삭제
 * @필수값 data = 댓글 아이디, 유저 아이디
 */
export const deleteUnivBoardCommentDB = createAsyncThunk(
    "univBoard/delete/comment",
    async (data, thunkAPI) => {
        try {
            // 댓글 삭제 요청
            const response = await univBoardApi.deleteComment(data);
            if (response.data.ok) {
                // 댓글 삭제 성공시 최신 댓글 리스트 배열 요청
                thunkAPI.dispatch(getUnivBoardCommentDB(data.post_id));
            } else if (!response.data.ok) {
                return thunkAPI.rejectWithValue(response.data.message);
            }
        } catch (error) {
            Swal.fire(
                "에러",
                "댓글 삭제에 실패하였습니다. 다시 시도해주세요",
                "error",
            );
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    },
);
export const univLikeToggleDB = createAsyncThunk(
    "univBoard/like/post",
    async (data, thunkAPI) => {
        try {
            const response = await univBoardApi.univLikeToggle(data);
            if (response.data.ok) {
                if (response.data.message === "disliked post") {
                    //좋아요 취소
                    thunkAPI.dispatch(decreaseLike());
                } else {
                    //좋아요
                    thunkAPI.dispatch(increaseLike());
                }
            }
        } catch (err) {
            Swal.fire(
                "에러",
                "좋아요 등록에 실패하였습니다. 다시 시도해주세요",
                "error",
            );
            return thunkAPI.rejectWithValue(err.response.message);
        }
    },
);
