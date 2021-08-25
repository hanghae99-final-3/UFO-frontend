import React from "react";
import ReactDOM from "react-dom";

import { store } from "./Redux/configureStore";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import GlobalThemeProvider from "./Styles/GlobalThemeProvider";
import App from "./App";

ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <GlobalThemeProvider>
                <App />
            </GlobalThemeProvider>
        </Provider>
    </CookiesProvider>,
    document.getElementById("root"),
);
