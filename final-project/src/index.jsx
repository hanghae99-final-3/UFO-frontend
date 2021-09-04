import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import { store } from "./Redux/configureStore";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import GlobalThemeProvider from "./Styles/GlobalThemeProvider";
import App from "./App";

Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
});

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
