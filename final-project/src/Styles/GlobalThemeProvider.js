import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import media from "./media";
import { GlobalStyle } from "./globalStyle";
import { DarkGlobalStyle } from "./darkGlobalStyles";
import { useSelector } from "react-redux";

const GlobalThemeProvider = ({ children }) => {
    const isDarkTheme = useSelector(state => state.user.isDarkTheme);
    return (
        <ThemeProvider theme={{ ...theme, ...media }}>
            <GlobalStyle />
            {isDarkTheme && <DarkGlobalStyle />}
            {children}
        </ThemeProvider>
    );
};

export default GlobalThemeProvider;
