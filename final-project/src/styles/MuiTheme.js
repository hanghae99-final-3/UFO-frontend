import { createMuiTheme } from "@material-ui/core";

export const MuiTheme = createMuiTheme({
    overrides: {
        MuiInput: {
            underline: {
                "&:before": {
                    borderBottomColor: "#e5e5e5",
                },
                "&:hover:not($disabled):before": {
                    borderBottomColor: "#8689FF",
                },
                "&:after": {
                    borderBottomColor: "#8689FF",
                },
            },
        },
    },
});
