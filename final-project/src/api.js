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

    //게시물 수정하기
    editPost: post => {
        return instance.put(`free/post/${post.post_id}`, post);
    },
    //게시물 삭제하기
    deletePost: id_list => instance.delete(`free/post/${id_list.post_id}`),
};

export const freeCommentApi = {
    //게시물 댓글불러오기
    getPostCommentList: post_id => instance.get(`free/comment/${post_id}`),

    //게시물 댓글추가하기
    addPostComment: comment => instance.post("free/comment", comment),

    //게시물 댓글수정하기
    editPostComment: comment =>
        instance.put(`free/comment/${comment.comment_id}`, {
            content: comment.content,
        }),

    //게시물 댓글삭제하기
    deletePostComment: comment =>
        instance.delete(`free/comment/${comment.comment_id}`),
};

export const issueApi = {};

export const univBoardApi = {
    //UnivBoard 목록 불러오기
    getList: (data) => {
        return instance.get("/univ/post",{
                params:{
                    pageSize:data.pageSize,
                    pageNum:data.pageNum
                }
        });
    },

    //대학 게시판 게시글 작성하기
    addPost: ({ title, content, category, univId }) =>
        instance.post("/univ/post", {
            title,
            content,
            category,
            is_fixed: false, // 테스트 마치면 수정 필요함
            univ_id: univId, //테스트 마치면 수정 필요함
        }),

    // 대학 게시판 게시물 수정
    editPost: data =>
        instance.put(`univ/post/${data.postId}`, {
            univ_id: data.univId,
            title: data.title,
            content: data.content,
            is_fixed: true,
            category: data.category,
        }),

    //게시물 상제정보 불러오기
    getPostDetail: post_id => {
        return instance.get(`/univ/post/${post_id}`);
    },

    //게시물 삭제하기
    deletePost: ({ postId }) => instance.delete(`univ/post/${postId}`),

    // 게시물 댓글 생성
    addComment: ({ postId, content }) =>
        instance.post("univ/comment", {
            post_id: postId,
            content, // 게시물 댓글 내용
        }),

    // 게시물 댓글 수정
    editComment: ({ commentId, content }) =>
        instance.put(`univ/comment/${commentId}`, {
            content, // 게시물 댓글 내용
        }),

    //게시물 댓글 삭제
    deleteComment: ({ commentId }) =>
        instance.delete(`univ/comment/${commentId}`),

    // 게시물 모든 댓글 불러오기
    getComment: postId => instance.get(`univ/comment/${postId}`),
};

export const univCommentApi = {};

export const electionApi = {};

export const voteApi = {};
