import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import media from "./media";
import { GlobalStyle } from "./globalStyle";

const GlobalThemeProvider = ({ children }) => {
    return (
        <ThemeProvider theme={{ ...theme, ...media }}>
            <GlobalStyle />
            {children}
        </ThemeProvider>
    );
};

export default GlobalThemeProvider;
