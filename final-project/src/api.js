import axios from "axios";
import { getToken } from "./utils";
import Swal from "sweetalert2";
import { history } from "./redux/configureStore";

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

// ┏----------interceptor를 통한 response 설정----------┓
instance.interceptors.response.use(
    async response => {
        if (response.data.message === "new token") {
            const { config } = response;
            const originalRequest = config;

            const newAccessToken = response.data.myNewToken;
            localStorage.setItem("token", newAccessToken);

            axios.defaults.headers.common.authorization = `Bearer ${newAccessToken}`;
            originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
            return axios(originalRequest);
        }

        return response;
    },
    async error => {
        const {
            config,
            response: { status },
        } = error;

        if (
            status === 401 &&
            error.response.data.message !== "비밀번호가 틀렸습니다."
        ) {
            localStorage.removeItem("token");
            Swal.fire("로그인", "로그인 시간이 만료되었습니다.", "error");
        }
        return Promise.reject(error);
    },
);

// 사용자 관련 axios API 통신
export const userApi = {
    // 회원 가입
    signup: data =>
        instance.post("api/user", {
            email: data.email,
            nickname: data.nickname,
            password: data.password,
        }),
    // 유저 프로필 변경
    editUserProfile: ({ nickname, email, password, userId, newPassword }) =>
        instance.put(`api/user/${userId}`, {
            email,
            nickname,
            password,
            new_password: newPassword,
        }),
    // 로그인
    login: data =>
        instance.post("auth/login", {
            email: data.email,
            password: data.password,
        }),
    // 유저 정보 조회
    getUser: userId => instance.get(`api/user/${userId}`),
    // 이메일 인증 코드 발송
    verifyUniEmail: email =>
        instance.post("/auth/email", {
            school_email: email,
        }),
    // 인증 코드 확인
    checkVerifyCode: ({ user_id, email }) =>
        instance.post("/auth/email/check", {
            user_id: user_id,
            school_email: email,
        }),
    // 계정 삭제
    deleteAccount: userId => instance.delete(`api/user/${userId}`),
    // 내가 쓴 글 불러오기
    getMyPosts: data =>
        instance.get("/api/user/my-post", {
            params: {
                pageSize: data.pageSize,
                pageNum: data.pageNum,
            },
        }),
    getMyCommentedPost: data =>
        instance.get("/api/user/my-comment", {
            params: {
                pageSize: data.pageSize,
                pageNum: data.pageNum,
            },
        }),
    // 관리자 확인
    checkAdmin: () => instance.get("/api/is-admin"),
};

export const freeBoardApi = {
    //모든 자유게시판리스트 불러오기
    getList: data =>
        instance.get("free/post", {
            params: {
                pageSize: data.pageSize,
                pageNum: data.pageNum,
                category: data?.category,
                country_id: data?.country_id,
            },
        }),

    // 인기 게시물 불러오기

    getIssueList: data => instance.get("/issue"),

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

    //게시물 좋아요 갯수 불러오기
    postLikeToggle: post_id => {
        return instance.get(`/free/post/${post_id}/like`);
    },
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

export const univBoardApi = {
    //UnivBoard 목록 불러오기
    getList: data => {
        return instance.get("/univ/post", {
            params: {
                pageNum: data.pageNum,
                pageSize: data.pageSize,
                univ_id: data.univ_id,
                category: data?.category,
            },
        });
    },

    //대학 게시판 게시글 작성하기
    addPost: ({ title, content, category, is_fixed, univ_id }) =>
        instance.post("/univ/post", {
            title,
            content,
            category,
            is_fixed, // 테스트 마치면 수정 필요함
            univ_id, //테스트 마치면 수정 필요함
        }),

    // 대학 게시판 게시물 수정
    editPost: ({
        title,
        content,
        category,
        is_fixed,
        univ_id,
        post_id,
        img_list,
    }) =>
        instance.put(`univ/post/${post_id}`, {
            univ_id,
            title,
            content,
            is_fixed,
            category,
            img_list,
        }),

    //게시물 상제정보 불러오기
    getPostDetail: post_id => {
        return instance.get(`/univ/post/${post_id}`);
    },

    //게시물 삭제하기
    deletePost: ({ post_id }) => instance.delete(`univ/post/${post_id}`),

    // 게시물 댓글 생성
    addComment: ({ post_id, content }) =>
        instance.post("univ/comment", {
            post_id,
            content, // 게시물 댓글 내용
        }),

    // 게시물 댓글 수정
    editComment: ({ comment_id, content }) =>
        instance.put(`univ/comment/${comment_id}`, {
            content, // 게시물 댓글 내용
        }),

    //게시물 댓글 삭제
    deleteComment: ({ comment_id }) =>
        instance.delete(`univ/comment/${comment_id}`),

    // 게시물 모든 댓글 불러오기
    getComment: post_id => instance.get(`univ/comment/${post_id}`),

    //게시물 좋아요/취소
    univLikeToggle: post_id => instance.get(`/univ/post/${post_id}/like`),
};

export const searchApi = {
    // 게시글 검색
    searchBySearchTerm: data =>
        instance.get("free/search", {
            params: {
                pageSize: data.pageSize,
                pageNum: data.pageNum,
                category: data?.category,
                country_id: data?.country_id,
                keyword: data?.keyword,
                sort: data?.sort,
            },
        }),
    searchUnivBySearchTerm: data =>
        instance.get("univ/search", {
            params: {
                pageSize: data.pageSize,
                pageNum: data.pageNum,
                category: data?.category,
                country_id: data?.country_id,
                keyword: data?.keyword,
                sort: data?.sort,
            },
        }),

    searchMain: data =>
        instance.get("util/search", {
            params: {
                keyword: data?.keyword,
                pageSize: data?.pageSize,
                pageNum: data?.pageNum,
            },
        }),
};

export const electionApi = {
    //전체선거게시글 조회
    getElectionList: () => instance.get("election"),

    //특정선거게시글 조회
    getElection: election_id => instance.get(`election/${election_id}`),

    //선거게시글 추가
    addElection: ({
        name,
        content,
        country_id,
        univ_id,
        candidates,
        start_date,
        end_date,
    }) =>
        instance.post("election", {
            name,
            content,
            country_id,
            univ_id,
            candidates,
            start_date,
            end_date,
        }),

    //특정 선거게시글 수정
    editElection: ({
        name,
        content,
        country_id,
        univ_id,
        candidates,
        start_date,
        end_date,
        election_id,
    }) =>
        instance.put(`election/${election_id}`, {
            name,
            content,
            country_id,
            univ_id,
            candidates,
            start_date,
            end_date,
        }),

    //특정 선거게시글 삭제
    deleteElection: ({ election_id }) =>
        instance.delete(`election/${election_id}`),
};

export const voteApi = {
    //투표추가
    addVote: ({ election_id, candidate_id }) =>
        instance.post(`election/vote/${election_id}`, { candidate_id }),

    //특정 선거게시글 결과조회
    getResult: ({ election_id }) =>
        instance.get(`election/${election_id}/result`),
};

export const imageApi = {
    //단일 이미지 업로드
    uploadImage: ({ img }) => instance.post("util/image", { img }),

    //대량 이미지 업로드
    uploadImages: ({ img }) => instance.post("util/bulk-image", { img }),
};

export default instance;
