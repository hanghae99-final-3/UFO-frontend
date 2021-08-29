import React, { useEffect } from "react";
import instance from "./Shared/api";
const KakaoLogin = () => {
    useEffect(() => {
        const abc = async () => {
            const response = await instance.get("/auth/kakao/callback");
            return response;
        };
    });
    return <div>kakao login box</div>;
};

export default KakaoLogin;
