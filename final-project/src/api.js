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
    //getToken는 로컬 스토리지에 토큰이 있다면 반환한다.
    config.headers["authorization"] = `Bearer ${await getToken()}`;
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
    login: data =>
        instance.post("auth/login", {
            email: data.email,
            password: data.password,
        }),
    getUser: userId => instance.get(`api/user/${userId}`),
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

export const univBoardApi = {
    //UnivBoard 목록 불러오기
    getList: () => {
        return instance.get("/univ/post");
    },

    //대학 게시판 게시글 작성하기
    addPost: ({ title, content, category, userId }) =>
        instance.post("/univ/post", {
            title,
            content,
            category,
            user_id: userId,
            is_fixed: false, // 테스트 마치면 수정 필요함
            univ_id: 1, //테스트 마치면 수정 필요함
        }),

    // 대학 게시판 게시물 수정
    editPost: data =>
        instance.put(`univ/post/${data.postId}`, {
            user_id: data.userId,
            univ_id: 3,
            title: data.title,
            content: data.content,
            is_fixed: true,
            category: data.category,
        }),

    //게시물 상제정보 불러오기
    getPostDetail: post_id => {
        return instance.get(`/univ/post/${post_id}`);
    },

    //게시물 수정하기
    updatePost : (data)=>{
        return instance.put(`/univ/post/${data.post_id}`, {
            // data값 보내기
            user_id: 1,
            univ_id: 3,
            title: data.title,
            category: 1,
            content: data.content,
            is_fixed: false
        })
    },
    //게시물 삭제하기
    deletePost: ({ postId, userId }) =>
        instance.delete(`univ/post/${postId}`, {
            data: {
                user_id: userId,
            },
        }),

    // 게시물 댓글 생성
    addComment: ({ postId, userId, content }) =>
        instance.post("univ/comment", {
            user_id: userId,
            post_id: postId,
            content, // 게시물 댓글 내용
        }),

    // 게시물 댓글 수정
    editComment: ({ commentId, userId, content }) =>
        instance.put(`univ/comment/${commentId}`, {
            user_id: userId,
            content, // 게시물 댓글 내용
        }),

    //게시물 댓글 삭제
    deleteComment: ({ commentId, userId }) =>
        instance.delete(`univ/comment/${commentId}`, {
            data: { user_id: userId },
        }),

    // 게시물 모든 댓글 불러오기
    getComment: postId => instance.get(`univ/comment/${postId}`),
};

export const univCommentApi = {

    //댓글 불러오기
    getUnivComment : ()=>{
        return instance.get('univ/comment/:post_id')
    },

    //댓글 추가하기
    addUnivComment : (data) =>{
        return instance.post('univ/comment',{
            content : data.content //아직 안찍어봄
        })
    }
};

export const electionApi = {};

export const voteApi = {};
