import axios from "axios";

import { getToken } from "./token";

// Axios 인스턴스 설정
const instance = axios.create({
    baseURL: "<백엔드 서버 endpoint>",
});

// interceptor를 통한 header 설정
instance.interceptors.request.use((config) => {
    config.headers["content-type"] = "application/json; charset=utf-8";
    config.headers["X-Requested-With"] = "XMLHttpRequest";
    config.headers["Accept"] = "*/*";
    config.headers["authorization"] = `Bearer ${getToken()}`;
    return config;
});

//
export const userApi = {};

export const freeBoardApi = {};

export const freeCommentApi = {};

export const issueApi = {};

export const univBoardApi = {};

export const univCommentApi = {};

export const electionApi = {};

export const voteApi = {};
