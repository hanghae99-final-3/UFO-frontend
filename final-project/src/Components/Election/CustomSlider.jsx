import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";

//아이콘
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

//애니메이션
import Boop from "../../Elements/Animations/Boop";

//컴포넌트
import CandidateCard from "./CandidateCard";

//getCurrentIdx는 현재 포커스되어있는 슬라이드의 인덱스를 부모컴포넌트에 넘겨주는 함수입니다.
const CustomSlider = ({ candidateList, getCurrentIdx, isDarkTheme }) => {
    //PC가 아닐때 사용하는 Slider입니다!!!!

    const TOTAL_SLIDES = candidateList.length - 1;
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideRef = useRef(null);

    const isTablet =
        document.documentElement.clientWidth >= 798 &&
        document.documentElement.clientWidth < 1080
            ? true
            : false;

    const isMobile = document.documentElement.clientWidth < 798 ? true : false;

    const nextSlide = () => {
        //nextSlide는 NextArrow를 눌렀을 때 동작하는 함수입니다. 그다음 slide로 넘어가게 합니다.
        if (currentSlide >= TOTAL_SLIDES) {
            // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
            setCurrentSlide(0);
        } else {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        //prevSlide PrevArrow 눌렀을 때 동작하는 함수입니다. 이전 slide로 넘어가게 합니다.
        if (currentSlide === 0) {
            setCurrentSlide(TOTAL_SLIDES);
        } else {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const NextArrow = ({ onClick }) => {
        //NextArrow는 슬라이더 네비게이션 렌더링 함수입니다.
        return (
            //onClick으로 받아온 함수를 실행시킵니다. direction은 스타일링을 위해 필요한 props 입니다.
            <ArrowContainer
                isDarkTheme={isDarkTheme}
                isTablet={isTablet}
                isMobile={isMobile}
                direction="next"
                onClick={onClick}
            >
                <Boop rotation={0} timing={200} x={5} y={0}>
                    <FaArrowRight />
                </Boop>
            </ArrowContainer>
        );
    };

    const PrevArrow = ({ onClick }) => {
        //PrevArrow 슬라이더 네비게이션 렌더링 함수입니다.
        return (
            //onClick으로 받아온 함수를 실행시킵니다. direction은 스타일링을 위해 필요한 props 입니다.
            <ArrowContainer
                isDarkTheme={isDarkTheme}
                direction="prev"
                onClick={onClick}
            >
                <Boop rotation={0} timing={200} x={-5} y={0}>
                    <FaArrowLeft />
                </Boop>
            </ArrowContainer>
        );
    };

    useEffect(() => {
        //currentSlide가 바뀌면 slideRef가 애니메이션 전환이되도록 설정합니다.
        slideRef.current.style.transition = "all 0.5s ease-in-out";
        slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
        getCurrentIdx(currentSlide);
    }, [currentSlide]);

    return (
        <Container>
            <SliderContainer ref={slideRef}>
                {candidateList &&
                    candidateList.map((candidate, idx) => (
                        <Slide id={idx}>
                            <CandidateCard candidate={candidate} />
                        </Slide>
                    ))}
            </SliderContainer>
            <PrevArrow onClick={prevSlide}></PrevArrow>
            <NextArrow onClick={nextSlide}></NextArrow>
        </Container>
    );
};
const Container = styled.div`
    ${props => props.isTablet && `width: 60%;`}
    ${props => props.isMobile && `width:80%;`}
    margin: 0 auto;
    overflow: hidden; // 선을 넘어간 이미지들은 보이지 않도록 처리합니다.
    position: relative;
`;

const SliderContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
`;

const Slide = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 100%;
    margin-bottom: 8px;
`;

const ArrowContainer = styled.div`
    cursor: pointer;
    z-index: 99;
    ${props =>
        mixin.textProps(20, "regular", props.isDarkTheme ? "white" : "black")}
    :hover {
        svg {
            color: ${({ theme }) => theme.color.blue2};
        }
    }
    svg {
        transition: color 300ms;
    }
    ${props =>
        props.direction === "next" && mixin.floatBox("absolute", "50%", "0")};
    ${props =>
        props.direction === "prev" &&
        mixin.floatBox("absolute", "50%", null, null, "0")};
`;

export default CustomSlider;
