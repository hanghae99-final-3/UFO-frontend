import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components"; // 스타일 컴포넌트 라이브러리
import mixin from "../../Styles/Mixin";
import { useSelector, useDispatch } from "react-redux"; // 리덕스
import { useCookies } from "react-cookie"; // 쿠키 훅스
import categories from "../../Shared/categories"; //국가선택 카테고리를 가져오는 곳

//통신
import { setCountryReducer } from "../..//Redux/Modules/freeBoardSlice.js"; // 나라 선택 리듀서

export default function SelectCountry() {
    const dispatch = useDispatch();
    const [cookies, setCookie] = useCookies(["rememberCountry"]); // 쿠키 훅스
    const selectedData = useSelector(
        state => state.freeBoard.selectedCountry,
    ) || { id: 0, name: "전체", icon: "🌍", engName: "All" }; //셀렉터의 정보가 담겨져있습니다!

    // 국가 선택 변경 핸들러
    const handleChange = event => {
        if (
            cookies.rememberCountry !== event.target.id ||
            cookies.rememberCountry === undefined
        ) {
            //값을 쿠키에 저장해둡니다.
            setCookie("rememberCountry", event.target.id, {
                maxAge: 60 * 60 * 24,
            });
        }

        //쿠키에 저장된 값과 일치하는 데이터 찾기
        const matchData = categories.countrySelectorList.find(
            ele => ele.id === Number(event.target.id),
        );

        //리덕스에 셀렉터 정보 저장하기
        dispatch(
            setCountryReducer({
                //state에 저장해둡니다.
                id: Number(event.target.id),
                name: matchData.name,
                icon: matchData.icon,
                engName: matchData.engName,
            }),
        );
    };

    return (
        <Container>
            <SelecterBox>
                {categories.countrySelectorList.map(country => (
                    <Option
                        key={country.id}
                        id={country.id}
                        onClick={handleChange}
                        isSelected={selectedData.id === country.id}
                    >
                        {country.name}
                    </Option>
                ))}
            </SelecterBox>
        </Container>
    );
}

const Container = styled.div``;

const SelecterBox = styled.ul`
    color: ${props => props.theme.color.white};
    padding: ${({ theme }) => `${theme.calRem(12)} ${theme.calRem(33)}`};
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    position: static;
    padding: 0;
    width: 90%;
`;

const Option = styled.li`
    //선택된 값과 일치하는 Option은 blue3로 보이게된다.
    cursor: pointer;
    ${props =>
        props.isSelected
            ? mixin.textProps(30, "extraBold", "mainMint")
            : mixin.textProps(30, "extraBold", "blue1")};
    :not(:last-child) {
        margin-bottom: ${({ theme }) => theme.calRem(7)};
    }
    @media ${({ theme }) => theme.mobile} {
        font-size: ${({ theme }) => theme.fontSize["18"]};
    }
`;
