import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import { useDispatch, useSelector } from "react-redux";
import { setCountryReducer } from "../redux/modules/freeBoardSlice";

const BootstrapInput = withStyles(theme => ({
    root: {
        "label + &": {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: "relative",
        backgroundColor: theme.palette.background.paper,
        border: "1px solid #ced4da",
        fontSize: 16,
        padding: "10px 26px 10px 12px",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
        "&:focus": {
            borderRadius: 4,
            borderColor: "#80bdff",
            boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
        },
    },
}))(InputBase);

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

export default function SelectCountry() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [country, setCountry] = useState(0);
    const [cookies, setCookie, removeCookie] = useCookies(["rememberCountry"]);

    useEffect(() => {
        if (cookies.rememberCountry !== undefined) {
            setCountry(parseInt(cookies.rememberCountry));
        }
        dispatch(setCountryReducer(country));
    }, [country, dispatch]);

    const handleChange = event => {
        if (
            cookies.rememberCountry !== event.target.value ||
            cookies.rememberCountry === undefined
        ) {
            setCookie("rememberCountry", event.target.value, {
                maxAge: 60 * 60 * 24,
            });
        }
        setCountry(event.target.value);
    };
    return (
        <div>
            <FormControl className={classes.margin}>
                <InputLabel id="demo-customized-select-label">국가</InputLabel>
                <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={country}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                >
                    <MenuItem value={0}>전체</MenuItem>
                    <MenuItem value={3}>미국</MenuItem>
                    <MenuItem value={4}>캐나다</MenuItem>
                    <MenuItem value={5}>영국</MenuItem>
                    <MenuItem value={2}>호주</MenuItem>
                    <MenuItem value={1}>베트남</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
