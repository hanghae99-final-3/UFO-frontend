import axios from "axios";
import { getToken } from "./utils";

// Axios 인스턴스 설정
const instance = axios.create({
    baseURL: "http://3.36.90.60/",
});

//┏----------interceptor를 통한 header 설정----------┓
instance.interceptors.request.use(async config => {
    config.headers["content-type"] = "application/json; charset=utf-8";
    config.headers["X-Requested-With"] = "XMLHttpRequest";
    config.headers["Accept"] = "*/*";
    //getToken는 로컬 스토리지에 토큰이 있다면 반환한다 없다면 null 값 반환
    config.headers["authorization"] = await getToken();
    return config;
});

// 사용자 관련 axios API 통신
export const userApi = {
    signup: data =>
        instance.post("api/user", {
            email: data.email,
            nickname: data.nickname,
            password: data.password,
        }),
    editUserProfile: ({ nickname, email, password, userId }) =>
        instance.put(`api/user/${userId}`, {
            email,
            nickname,
            password,
        }),
    login: data =>
        instance.post("auth/login", {
            email: data.email,
            password: data.password,
        }),
    getUser: userId => instance.get(`api/user/${userId}`),
    verifyUniEmail: email =>
        instance.post("/auth/email", {
            school_email: email,
        }),
    checkVerifyCode: ({ userId, email }) =>
        instance.post("/auth/email/check", {
            user_id: userId,
            school_email: email,
        }),
    deleteAccount: userId => instance.delete(`api/user/${userId}`),

    kakaoLogin: () => instance.get("api/kakao"),
};

export const freeBoardApi = {
    //모든 자유게시판리스트 불러오기
    getList: () => instance.get("free/post"),

    //게시물추가하기
    addPost: post => instance.post("free/post", post),

    //게시물 불러오기
    getPost: post_id => instance.get(`free/post/${post_id}`),

    //게시물 댓글불러오기
    getComment: post_id => instance.get(`free/comment/${post_id}`),

    //게시물 수정하기
    editPost: post => {
        return instance.put(`free/post/${post.post_id}`, post);
    },
    //게시물 삭제하기
    deletePost: id_list =>
        instance.delete(`free/post/${id_list.post_id}`, {
            data: { user_id: id_list.user_id },
        }),
};

export const freeCommentApi = {};

export const issueApi = {};

export const univBoardApi = {};

export const univCommentApi = {};

export const electionApi = {};

export const voteApi = {};
