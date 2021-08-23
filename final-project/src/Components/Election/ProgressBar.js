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
    const value =
        Math.ceil((moment().diff(moment(start)) / max) * 100) >= 100
            ? 100
            : Math.ceil((moment().diff(moment(start)) / max) * 100); //현재값을 백분율로 나타낸것

    // 투표가 시작전이면 value 값은 0과 같거나 작게 됩니다. 따라서, value가 0보다 크면 프로그래스바를 진행하고, 아니면 진행하지 않습니다.
    return (
        <>
            {value > 0 ? (
                <Container>
                    <Bar value={value} />
                </Container>
            ) : (
                <Container />
            )}
        </>
    );
};
// 스타일 컴포넌트 작성 위치
const Container = styled.div`
    width: 100%;
    height: 10px;
    background-color: ${({ theme }) => theme.color.blue2};
    overflow: hidden;
`;

const Bar = styled.div`
    height: 100%;
    animation: progressbar 1.5s ease-in-out forwards;
    background-color: ${({ theme }) => theme.color.mint};

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
