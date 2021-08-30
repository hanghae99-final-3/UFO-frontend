import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./Redux/configureStore";
import { useDispatch, useSelector } from "react-redux";

//컴포넌트
import ProtectedRoute from "./Shared/ProtectedRoute";

import Layout from "./Components/Layout/Layout"; // 앱의 헤더나 푸터같이 큰 틀을 담당하는 컴포넌트

//페이지
import Login from "./Pages/Auth/Login"; //로그인페이지
import Home from "./Pages/Home/Home"; // 메인페이지
import Signup from "./Pages/Auth/Signup"; // 회원가입페이지
import MyPage from "./Pages/Mypage/MyPage";
import MyPost from "./Pages/Mypage/MyPost"; // 내가 쓴 글
import FreeBoard from "./Pages/FreeBoard/FreeBoard"; //자유게시판페이지
import FreeBoardDetail from "./Pages/FreeBoard/FreeBoardDetail"; //자유게시판 게시글상세페이지
import FreeBoardWrite from "./Pages/FreeBoard/FreeBoardWrite"; //자유게시판 게시글작성페이지 or 게시글수정페이지
import UnivBoard from "./Pages/UnivBoard/UnivBoard"; //대학게시판
import UnivBoardDetail from "./Pages/UnivBoard/UnivBoardDetail"; //대학게시판 게시글상세페이지
import UnivboardWrite from "./Pages/UnivBoard/UnivBoardWrite";
import Election from "./Pages/Election/Election"; //선거게시판
import ElectionDetail from "./Pages/Election/ElectionDetail"; //선거게시판 게시글상세페이지
import ElectionWrite from "./Pages/Election/ElectionWrite"; //선거게시글 작성페이지 or 수정페이지
import MainSearchResultPage from "./Pages/Search/MainSearchResultPage"; //메인검색결과페이지

import KakaoLogin from "./KakaoLogin";

//utils
import { checkAdminDB, checkLoggedInUser } from "./Redux/Async/user"; // 로그인 체크
import { setDarkTheme } from "./Redux/Modules/userSlice"; //다크모드 주입 함수
import { getDarkTheme } from "./Shared/utils";

function App() {
    // redux dispatch
    const dispatch = useDispatch();
    // 로컬 스토리지 토큰 확인
    const is_token = localStorage.getItem("token") ? true : false;
    // 유저 대학교 이메일 인증 여부 확인
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);

    useEffect(() => {
        if (is_token) {
            dispatch(checkLoggedInUser());
            dispatch(checkAdminDB());
        }

        const LSDarkTheme = getDarkTheme(); //로컬스토리지에 있는 dark모드 값입니다.
        if (LSDarkTheme === "true") {
            setDarkTheme(true);
        }
        if (!LSDarkTheme || LSDarkTheme === "false") {
            setDarkTheme(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, isLoggedIn]);

    return (
        <>
            <ConnectedRouter history={history}>
                <Layout>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route
                            path="/auth/kakao/callback"
                            component={KakaoLogin}
                        />
                        <Route path="/signup" exact component={Signup} />
                        <Route path="/login" exact component={Login} />
                        <Route
                            path="/util/search/:keyword"
                            exact
                            component={MainSearchResultPage}
                        />
                        <Route
                            path="/util/search"
                            exact
                            component={MainSearchResultPage}
                        />

                        <Route
                            path="/freeboard/write"
                            exact
                            component={FreeBoardWrite}
                        />

                        <Route path="/freeboard" exact component={FreeBoard} />
                        <Route
                            path="/freeboard/:id"
                            exact
                            component={FreeBoard}
                        />

                        <Route path="/mypost/:path" exact component={MyPost} />
                        <Route
                            path="/freeboard/detail/:id"
                            exact
                            component={FreeBoardDetail}
                        />

                        <Route
                            path="/freeboard/edit/:id"
                            exact
                            component={FreeBoardWrite}
                        />

                        <Route path="/mypage" exact component={MyPage} />

                        {/* ------대학 게시판 관련 route은 인증된 회원만 접근 가능-------- */}
                        {/*-------------- ProjectedRoute로 접근을 제한한다.-----------*/}

                        <Route
                            path="/univboard/write"
                            exact
                            component={UnivboardWrite}
                        />
                        <ProtectedRoute
                            // 대학 게시판 페이지, 인증되지 않은 사용자 접근시 root 페이지로 redirect
                            path="/univboard"
                            exact
                            component={UnivBoard}
                        />
                        <ProtectedRoute
                            // 대학 게시판 페이지, 인증되지 않은 사용자 접근시 root 페이지로 redirect
                            path="/univboard/:id"
                            exact
                            component={UnivBoard}
                        />

                        <ProtectedRoute
                            // 대학 게시판 게시글 상세 페이지, 인증되지 않은 사용자 접근시 root 페이지로 redirect
                            path="/univboard/detail/:id"
                            exact
                            component={UnivBoardDetail}
                        />

                        <Route
                            path="/univboard/edit/:id"
                            exact
                            component={UnivboardWrite}
                        />
                        <Route path="/election" exact component={Election} />
                        <Route
                            path="/election/detail/:id"
                            exact
                            component={ElectionDetail}
                        />
                        <Route
                            path="/election/write"
                            exact
                            component={ElectionWrite}
                        />
                        <Route
                            path="/election/edit/:id"
                            exact
                            component={ElectionWrite}
                        />

                        <Redirect from="*" to="/" />
                    </Switch>
                </Layout>
            </ConnectedRouter>
        </>
    );
}

export default App;
