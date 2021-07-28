import React from "react";
import { ErrorMessage, useField } from "formik";
import { TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    root: {},
    ErrorMessage: {
        color: "red",
        fontSize: "8px",
        marginTop: "2px",
    },
});

export const LoginTextField = ({ label, ...props }) => {
    const classes = useStyles();
    const [field] = useField(props);
    return (
        <>
            <TextField
                required
                id="standard-required"
                label={label}
                autoComplete="off"
                onChange={field.onChange}
                // {...field}
                {...props}
                fullWidth
                className={classes.root}
            />

            <ErrorMessage name={field.name}>
                {msg => (
                    <Typography className={classes.ErrorMessage}>
                        {msg}
                    </Typography>
                )}
            </ErrorMessage>
        </>
    );
};
