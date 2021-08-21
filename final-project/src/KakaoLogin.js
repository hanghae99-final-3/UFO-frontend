import React, { useEffect } from "react";
import instance from "./api";
const KakaoLogin = () => {
    useEffect(() => {
        const abc = async () => {
            const response = await instance.get("/auth/kakao/callback");
            return response;
        };
        console.log("abc", abc());
    });
    return <div>kakao login box</div>;
};

export default KakaoLogin;
