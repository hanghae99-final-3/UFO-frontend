import React from "react";
import ReactDOM from "react-dom";

import { store } from "./redux/configureStore";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import App from "./App";

ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </CookiesProvider>,
    document.getElementById("root"),
);
