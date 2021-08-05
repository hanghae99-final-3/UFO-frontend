import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

import jwt from "jwt-decode"; // to get userId from loggedIn user's token
import { userApi } from "./api"; // axios user module

/**
 * @author heesung
 * @param component + path
 * @returns component
 * @역할 대학 게시판 비인증 유저 또는 로그인하지 않은 유저 접근 제한을 위한 protected router component
 * @필수값 component to be rendered
 */

const ProtectedRoute = ({ component: Component, ...rest }) => {
    // 로그인 유저의 대학교 이메일 인증 여부
    const [isAuth, setIsAuth] = React.useState(false);
    // 컴포넌트를 랜더링 하기 이전에 모든 checking point를 진행했는가의 여부
    const [render, setRender] = React.useState(false);
    // 학교 게시판 Route Component를 제한하기 위한 권한 여부 확인 (로그인 & 학교 이메일 인증)
    useEffect(() => {
        const loginCheck = async () => {
            // 로그인 확인을 위해 로컬 스토리지 토큰 확인
            const is_token = localStorage.getItem("token") ? true : false;
            if (is_token) {
                const token = localStorage.getItem("token");
                // 토큰 decode를 통해서 현재 로그인한 유저 id 가져오기
                const { user_id: userId } = jwt(token);
                try {
                    // 토큰 정보를 통해 로그인 유저 정보 확인
                    const response = await userApi.getUser(userId);
                    if (response.data.ok) {
                        // 유저의 학교인증 여부 확인후 Auth 상태 반영
                        setIsAuth(response.data.result.school_auth);
                    }
                } catch (e) {
                    setIsAuth(false);
                }
            }
            setRender(true);
        };
        loginCheck();
    }, []);
    return (
        <>
            {render && (
                <Route
                    {...rest}
                    render={props => {
                        if (isAuth) {
                            return <Component />;
                        } else {
                            alert(
                                "대학 게시판 사용을 위해서는 My page에서 이메일 인증을 진행해주세요.",
                            );
                            return (
                                <Redirect
                                    to={{
                                        pathname: "/",
                                        state: { from: props.location },
                                    }}
                                />
                            );
                        }
                    }}
                />
            )}
        </>
    );
};

export default ProtectedRoute;
