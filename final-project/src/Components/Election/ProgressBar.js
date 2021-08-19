import React from "react";
import styled from "styled-components";
import moment from "moment";

/**
 * @param start : 시작시간
 * @param end : 종료시간
 * @returns 리턴 설명 적어주기
 */

const ProgressBar = ({ start, end }) => {
    const max = moment(end).diff(start); //최대값
    const value = Math.ceil((moment(end).diff(moment()) / max) * 100);
    //현재값을 백분율로 나타낸것

    return (
        <>
            {value && (
                <Container>
                    <Bar value={value} />
                </Container>
            )}
        </>
    );
};
// 스타일 컴포넌트 작성 위치
const Container = styled.div`
    width: 100%;
    height: 10px;
    background-color: ${({ theme }) => theme.color.mainMint};
`;

const Bar = styled.div`
    height: 100%;
    animation: progressbar 3s forwards;
    background-color: ${({ theme }) => theme.color.mainBlue};

    @keyframes progressbar {
        0% {
            width: 0%;
        }
        100% {
            width: ${props => props.value}%;
        }
    }
`;

// default props 작성 위치
ProgressBar.defaultProps = {
    start: null,
    end: null,
};

export default ProgressBar;
