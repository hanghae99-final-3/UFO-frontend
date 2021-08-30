import React from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import moment from "moment";
import theme from "../../Styles/theme";
import { useSelector } from "react-redux";

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
    const isDarkTheme = useSelector(state=>state.user.isDarkTheme)
    const classes = useStyles();
    return (
        <Container>
            {/* 선거시작일 입력란 */}
            <DateBox isDarkTheme={isDarkTheme}>
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
            <DateBox isDarkTheme={isDarkTheme}>
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
    ${mixin.flexBox("center", "center", "column")};
`;

const DateBox = styled.div`
    ${mixin.flexBox("center", "center")};
    width: max-content;
    margin: ${theme.calRem(10)} 0 ${theme.calRem(40)} 0;
    @media ${({ theme }) => theme.mobile} {
        margin: ${theme.calRem(8)} 0;
    }
    span {
        ${props=>mixin.textProps(20, "extraBold", props.isDarkTheme?"mainGray":"gray1")};
        margin-right: ${theme.calRem(10)};
        @media ${({ theme }) => theme.mobile} {
            ${props=>mixin.textProps(16, "extraBold", props.isDarkTheme?"mainGray":"gray1")};
        }
    }

    /* Mui input에 cursor 주기 / 색깔넣기 */
    .MuiInputBase-input {
        cursor: pointer;
        color: ${props => props.isDarkTheme ? 'white' : 'black'}
    }

    /* Mui input 창에서 안쪽 여백주기 */
    input[type="datetime-local" i] {
        padding-inline-start: ${theme.calRem(10)};
        padding-inline-end: ${theme.calRem(10)};
    }

    /* 기존 Mui의 border 효과 제거 */
    .MuiInput-underline:before,
    .MuiInput-underline:after {
        display: none;
        
    }
`;

export default DateTimePicker;
