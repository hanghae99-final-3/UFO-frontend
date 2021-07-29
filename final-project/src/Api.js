import axios from "axios";

// import { getToken } from "./token";

// Axios 인스턴스 설정
const instance = axios.create({
    baseURL: "http://3.36.90.60/",
});

// interceptor를 통한 header 설정
instance.interceptors.request.use(config => {
    config.headers["content-type"] = "application/json; charset=utf-8";
    config.headers["X-Requested-With"] = "XMLHttpRequest";
    config.headers["Accept"] = "*/*";
    // config.headers["authorization"] = `Bearer ${getToken()}`;
    return config;
});

//
export const userApi = {};

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
    editPost: post => instance.put(`/free/post/${post.post_id}`, post),

    //게시물 삭제하기
    deletePost: id_list =>
        instance.delete(`free/post/${id_list.post_id}`, {
            user_id: id_list.user_id,
        }),
};

export const freeCommentApi = {};

export const issueApi = {};

export const univBoardApi = {};

export const univCommentApi = {};

export const electionApi = {};

export const voteApi = {};
