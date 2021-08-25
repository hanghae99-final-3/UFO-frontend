import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components"; // 스타일 컴포넌트 라이브러리
import mixin from "../../Styles/Mixin";
import { useDispatch } from "react-redux"; // 리덕스
import { useCookies } from "react-cookie"; // 쿠키 훅스

//머테리얼 ui
import InputBase from "@material-ui/core/InputBase"; // 머테리얼 ui select input
import { Select as MuiSelect } from "@material-ui/core"; // 머테리얼 ui select
import { MenuItem as MuiMenuItem } from "@material-ui/core"; // 머테리얼 ui select item
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import ExpandLessIcon from "@material-ui/icons/ExpandLess"; // 더보기 접기 아이콘
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"; // 더보기 펼치기 아이콘

//통신
import { setCountryReducer } from "../..//Redux/Modules/freeBoardSlice.js"; // 나라 선택 리듀서

// 부트스트랩 input (머테리얼 ui select에 들어간다)
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

export default function SelectCountry() {
    const dispatch = useDispatch();
    const [country, setCountry] = useState(0); // 선택된 국가 값
    const [cookies, setCookie] = useCookies(["rememberCountry"]); // 쿠키 훅스
    const [isSelectOpen, setIsSelectOpen] = useState(false); // select 열림 / 닫힘 값

    useEffect(() => {
        if (cookies.rememberCountry !== undefined) {
            setCountry(parseInt(cookies.rememberCountry));
        }
        dispatch(setCountryReducer(country));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [country, dispatch]);

    // 국가 선택 변경 핸들러
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
    // 국가 선택 select 클린 이벤트 핸들러
    const handleClick = e => {
        setIsSelectOpen(!isSelectOpen);
    };
    const selectRef = useRef();
    const onClick = () => {
        selectRef.current.focus();
    };
    return (
        <StyleWrapper>
            {isSelectOpen ? (
                <ArrowUp onClick={onClick} />
            ) : (
                <ArrowDown onClick={onClick} />
            )}
            <FormControl>
                <Select
                    ref={selectRef}
                    onClick={handleClick}
                    id="demo-customized-select"
                    value={country}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                    IconComponent={props => null}
                    MenuProps={{
                        disablePortal: true,
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                        },
                        getContentAnchorEl: null,
                    }}
                >
                    <MenuItem value={0}>전체</MenuItem>
                    <MenuItem value={3}>미국</MenuItem>
                    <MenuItem value={2}>호주</MenuItem>
                    <MenuItem value={5}>영국</MenuItem>
                    <MenuItem value={1}>베트남</MenuItem>
                    <MenuItem value={4}>캐나다</MenuItem>
                </Select>
            </FormControl>
        </StyleWrapper>
    );
}

const MenuItem = styled(MuiMenuItem)``;
const Select = styled(MuiSelect)`
    .MuiPopover-paper {
        width: 128px;
        height: 225px;
        border-radius: 0 18px 18px 18px;
        background-color: ${props => props.theme.color.mainBlue};
        color: ${props => props.theme.color.white};
        &::-webkit-scrollbar {
            display: none;
        }
        ${mixin.textProps(18, "semiBold", "blue3")};
        ${mixin.flexBox("center", null, null, null)}
    }
    .MuiListItem-root.Mui-selected,
    .MuiListItem-root {
        background-color: transparent;
        :hover {
            background-color: transparent;
        }
    }
    .MuiListItem-root.Mui-selected {
        color: ${props => props.theme.color.mainMint};
    }
    #demo-customized-select {
        padding: 0;
        ${mixin.textProps(18, "semiBold", "gray2")};
    }
`;
const StyleWrapper = styled.div`
    margin-left: 40px;
    svg {
        width: 31px;
        height: 31px;
        font-size: 18px;
        line-height: 2;
    }
    ${mixin.flexBox("center", "center", null, null)};
`;
const ArrowUp = styled(ExpandLessIcon)`
    color: ${props => props.theme.color.mainMint};
`;
const ArrowDown = styled(ExpandMoreIcon)`
    color: ${props => props.theme.color.mainMint};
`;
