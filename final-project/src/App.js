import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configureStore";
import { useDispatch, useSelector } from "react-redux";

//컴포넌트
import { GlobalStyle } from "./globalStyle"; //글로벌 스타일
import ProtectedRoute from "./ProtectedRoute";
import Layout from "./Components/Layout"; // 앱의 헤더나 푸터같이 큰 틀을 담당하는 컴포넌트

//페이지
import Login from "./Pages/Login"; //로그인페이지
import Home from "./Pages/Home"; // 메인페이지
import Signup from "./Pages/Signup"; // 회원가입페이지
import MyPage from "./Pages/MyPage"; // MyPage 페이지
import FreeBoard from "./Pages/FreeBoard"; //자유게시판페이지
import FreeBoardDetail from "./Pages/FreeBoardDetail"; //자유게시판 게시글상세페이지
import FreeBoardWrite from "./Pages/FreeBoardWrite"; //자유게시판 게시글작성페이지 or 게시글수정페이지
import UnivBoard from "./Pages/UnivBoard"; //대학게시판
import UnivBoardDetail from "./Pages/UnivBoardDetail"; //대학게시판 게시글상세페이지
import UnivboardWrite from "./Pages/UnivBoardWrite";
import Election from "./Pages/Election"; //선거게시판
import ElectionDetail from "./Pages/ElectionDetail"; //선거게시판 게시글상세페이지
import ElectionWrite from "./Pages/ElectionWrite"; //선거게시글 작성페이지 or 수정페이지

//utils
import { checkLoggedInUser } from "./redux/async/user"; // 로그인 체크
import SearchResult from "./Pages/SearchResult";

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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, isLoggedIn]);

    return (
        <>
            <GlobalStyle />
            <ConnectedRouter history={history}>
                <Layout>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/signup" exact component={Signup} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/freeboard" exact component={FreeBoard} />
                        <Route
                            path="/freeboard/detail/:id"
                            exact
                            component={FreeBoardDetail}
                        />
                        <Route
                            path="/freeboard/write"
                            exact
                            component={FreeBoardWrite}
                        />
                        <Route
                            path="/freeboard/edit/:id"
                            exact
                            component={FreeBoardWrite}
                        />
                        <Route
                            path="/search/:param"
                            exact
                            component={SearchResult}
                        />
                        <Route path="/mypage" exact component={MyPage} />

                        {/* ------대학 게시판 관련 route은 인증된 회원만 접근 가능-------- */}
                        {/*-------------- ProjectedRoute로 접근을 제한한다.-----------*/}
                        <ProtectedRoute
                            // 대학 게시판 페이지, 인증되지 않은 사용자 접근시 root 페이지로 redirect
                            path="/univboard"
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
                            path="/univboard/write"
                            exact
                            component={UnivboardWrite}
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
                        <Redirect from="*" to="/" />
                    </Switch>
                </Layout>
            </ConnectedRouter>
        </>
    );
}

export default App;
