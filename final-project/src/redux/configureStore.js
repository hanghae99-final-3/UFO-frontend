import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

export const history = createBrowserHistory();

//리듀서 전달하기
const reducer = combineReducers({
    router: connectRouter(history),
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
