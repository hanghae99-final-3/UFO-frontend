import { createMuiTheme } from "@material-ui/core";

export const MuiTheme = createMuiTheme({
    overrides: {
        MuiInput: {
            underline: {
                "&:hover:not($disabled):before": {
                    borderBottomColor: "#8689FF",
                    borderWidth: "1px",
                },
                "&:after": {
                    borderBottomColor: "#8689FF",
                    borderWidth: "1px",
                },
                "&:hover:not($disabled):not($focused):not($error):before": {
                    borderBottom: `2px solid "#DEDFE0",  !important`,
                },
                "&:MuiInputBase-input": {
                    borderColor: "#DEDFE0",
                },
            },
        },
    },
});
