import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

//모듈 불러오기
import freeBoardSlice from "./modules/freeBoardSlice";
import userSlice from "./modules/userSlice";
import commentSlice from "./modules/commentSlice";

export const history = createBrowserHistory();

//리듀서 전달하기
const reducer = combineReducers({
    router: connectRouter(history),
    freeBoard: freeBoardSlice.reducer,
    comment: commentSlice.reducer,
    user: userSlice.reducer,
});

const middlewares = [];

const env = process.env.NODE_ENV;

if (env === "development") {
    const { logger } = require("redux-logger");
    middlewares.push(logger);
}

export const store = configureStore({
    reducer,
    middleware: [...middlewares, ...getDefaultMiddleware()],
    devTools: env !== "production",
});
