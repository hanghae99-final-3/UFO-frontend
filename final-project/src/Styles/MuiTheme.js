import { createTheme } from "@material-ui/core/styles";

export const MuiTheme = createTheme({
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
