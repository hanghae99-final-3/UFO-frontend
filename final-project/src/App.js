import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configureStore";
import { useDispatch } from "react-redux";

//컴포넌트
import { GlobalStyle } from "./globalStyle"; //글로벌 스타일
import Layout from "./Components/Layout"; // 앱의 헤더나 푸터같이 큰 틀을 담당하는 컴포넌트

//페이지
import Home from "./Pages/Home"; // 메인페이지
import Signup from "./Pages/Signup"; // 회원가입페이지
import Login from "./Pages/Login"; //로그인페이지
import FreeBoard from "./Pages/FreeBoard"; //자유게시판페이지
import FreeBoardDetail from "./Pages/FreeBoardDetail"; //자유게시판 게시글상세페이지
import FreeBoardWrite from "./Pages/FreeBoardWrite"; //자유게시판 게시글작성페이지 or 게시글수정페이지
import UnivBoard from "./Pages/UnivBoard"; //대학게시판
import UnivBoardDetail from "./Pages/UnivBoardDetail"; //대학게시판 게시글상세페이지
import { checkLoggedInUser } from "./redux/async/user";
import MyPage from "./Pages/MyPage";

function App() {
    const dispatch = useDispatch();

    const is_token = localStorage.getItem("token") ? true : false;

    useEffect(() => {
        if (is_token) {
            dispatch(checkLoggedInUser());
        }
    }, []);

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

                        <Route path="/univboard" exact component={UnivBoard} />

                        <Route
                            path="/univboard/detail/:id"
                            exact
                            component={UnivBoardDetail}
                        />
                        <Route path="/mypage" exact component={MyPage} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </Layout>
            </ConnectedRouter>
        </>
    );
}

export default App;
