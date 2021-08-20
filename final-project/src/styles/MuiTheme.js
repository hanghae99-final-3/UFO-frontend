import { createMuiTheme } from "@material-ui/core";

export const MuiTheme = createMuiTheme({
    overrides: {
        MuiInput: {
            underline: {
                "&:before": {
                    borderBottomColor: "#e5e5e5",
                },
                "&:hover:not($disabled):before": {
                    borderBottomColor: "#83FFCA",
                    transition: "border-color 1s ease",
                },
                "&:after": {
                    borderBottomColor: "#83FFCA",
                },
            },
        },
    },
});
