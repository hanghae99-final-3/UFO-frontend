import React from "react";
import moment from "moment";
import styled from "styled-components";
import mixin from "../../styles/Mixin";

//머테리얼 ui
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => {
    return {
        textField: {
            fontSize: `${18 / 16}rem`, //폰트크기
            fontWeight: 600, //폰트굵기
            border: "2px solid #8689ff",
            borderRadius: "20px",
        },
    };
});

//originStartDate,originEndDate : 원본값
//getDateInfo : 부모 컴포넌트에게 데이터를 넘겨주는 함수

const DateTimePicker = ({
    originStartDate,
    originEndDate,
    defaultDate,
    getDateInfo,
}) => {
    const classes = useStyles();
    return (
        <Container>
            {/* 선거시작일 입력란 */}
            <DateBox>
                <span>선거시작일</span>

                <TextField
                    name="start_date"
                    id="datetime-local"
                    type="datetime-local"
                    value={
                        originStartDate
                            ? moment(originStartDate).format("YYYY-MM-DDTHH:mm")
                            : moment(defaultDate.start).format(
                                  "YYYY-MM-DDTHH:mm",
                              )
                    }
                    className={classes.textField}
                    onChange={e => getDateInfo(e)}
                />
            </DateBox>

            {/* 선거종료일 입력란 */}
            <DateBox>
                <span>선거종료일</span>
                <TextField
                    name="end_date"
                    id="datetime-local"
                    type="datetime-local"
                    value={
                        originEndDate
                            ? moment(originEndDate).format("YYYY-MM-DDTHH:mm")
                            : moment(defaultDate.end).format("YYYY-MM-DDTHH:mm")
                    }
                    className={classes.textField}
                    onChange={e => getDateInfo(e)}
                />
            </DateBox>
        </Container>
    );
};

const Container = styled.div`
    ${mixin.flexBox("center", "center", "column")}
`;

const DateBox = styled.div`
    ${mixin.flexBox("center", "center")}
    width: max-content;
    margin: 10px 0 60px 0;
    span {
        ${mixin.textProps(20, "extraBold", "gray1")}
        margin-right: 10px;
    }

    /* Mui input에 cursor 주기 */
    .MuiInputBase-input {
        cursor: pointer;
    }

    /* Mui input 창에서 안쪽 여백주기 */
    input[type="datetime-local" i] {
        padding-inline-start: 10px;
        padding-inline-end: 10px;
    }

    /* 기존 Mui의 border 효과 제거 */
    .MuiInput-underline:before,
    .MuiInput-underline:after {
        display: none;
    }
`;

export default DateTimePicker;
