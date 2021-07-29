import axios from "axios";
import { getToken } from "./Utils/Utils";

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
        instance.post("api/login", {
            email: data.email,
            password: data.password,
        }),
    getUser: userId => instance.get(`api/user/${userId}`),
    kakaoLogin: () => instance.get("api/kakao"),
};

export const freeBoardApi = {};

export const freeCommentApi = {};

export const issueApi = {};

export const univBoardApi = {};

export const univCommentApi = {};

export const electionApi = {};

export const voteApi = {};
