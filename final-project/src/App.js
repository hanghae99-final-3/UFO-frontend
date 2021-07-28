import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configureStore";

//컴포넌트
import Layout from "./Components/Layout"; // 앱의 헤더나 푸터같이 큰 틀을 담당하는 컴포넌트

//페이지
import Home from "./Pages/Home"; // 메인페이지
import Signup from "./Pages/Signup"; // 회원가입페이지
import Login from "./Pages/Login"; //로그인페이지
import FreeBoard from "./Pages/FreeBoard"; //자유게시판페이지
import FreeBoardDetail from "./Pages/FreeBoardDetail"; //자유게시판 게시글상세페이지
import UnivBoard from "./Pages/UnivBoard"; //대학게시판
import UnivBoardDetail from "./Pages/UnivBoardDetail"; //대학게시판 게시글상세페이지

function App() {
    return (
        <>
            <ConnectedRouter history={history}>
                <Layout>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/signup" exact component={Signup} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/freeboard" exact component={FreeBoard} />
                        <Route
                            path="/freeboard/:id"
                            exact
                            component={FreeBoardDetail}
                        />
                        <Route path="/univboard" exact component={UnivBoard} />
                        <Route
                            path="/univboard/:id"
                            exact
                            component={UnivBoardDetail}
                        />
                        <Redirect from="*" to="/" />
                    </Switch>
                </Layout>
            </ConnectedRouter>
        </>
    );
}

export default App;
