import React, { useEffect, useState } from "react";
import styled from "styled-components";
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
    root: {},
    input: {
        position: "relative",
        backgroundColor: "white",
        border: "none",
        fontSize: 16,
        // transition: theme.transitions.create(["border-color", "box-shadow"]),
        "&:focus": {
            backgroundColor: "white",
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
    const [cookies, setCookie] = useCookies(["rememberCountry"]);

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
                <Select
                    id="demo-customized-select"
                    value={country}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                    IconComponent={() => null}
                    MenuProps={{
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                        },
                        getContentAnchorEl: null,
                    }}
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
