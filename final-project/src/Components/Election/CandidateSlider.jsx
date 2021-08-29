import { useState } from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";

//컴포넌트
import CandidateCard from "./CandidateCard";

//슬라이더
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

//애니메이션
import Boop from "../../Elements/Animations/Boop";
import CandidateIntroBox from "./CandidateIntroBox";
import CustomSlider from "./CustomSlider";
const isMobile = document.documentElement.clientWidth < 798 ? true : false;

const CandidateSlider = ({ candidateList }) => {
    const NextArrow = ({ onClick }) => {
        return (
            <ArrowContainer direction="next" onClick={onClick}>
                <Boop rotation={0} timing={200} x={5} y={0}>
                    <FaArrowRight />
                </Boop>
            </ArrowContainer>
        );
    };

    const PrevArrow = ({ onClick }) => {
        return (
            <ArrowContainer direction="prev" onClick={onClick}>
                <Boop rotation={0} timing={200} x={-5} y={0}>
                    <FaArrowLeft />
                </Boop>
            </ArrowContainer>
        );
    };

    const settings = {
        infinite: true,
        lazyLoad: true,
        speed: 300,
        slidesToShow: 3,
        centerMode: true,
        centerPadding: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        beforeChange: (current, next) => setCardIndex(next),
    };

    const [cardIndex, setCardIndex] = useState(0);

    //PC버전이 아닐때에는 커스텀슬라이드를 쓰기때문에, 때로 setCardIndex를 해주어야한다.
    const getCurrentIdxSetIndex = idx => {
        setCardIndex(idx);
    };

    //데스크탑 사이즈인지 아닌지에 대한 판별값입니다.
    const isDesktop =
        document.documentElement.clientWidth >= 1080 ? true : false;

    return (
        <SlideContainer>
            {/* 후보자 슬라이더 */}

            {/* PC버전에서는 slick slider을 사용한다. */}
            {isDesktop && (
                <Slider {...settings}>
                    {candidateList &&
                        candidateList.map((candidate, idx) => (
                            <Slide key={idx} active={idx === cardIndex}>
                                <CandidateCard candidate={candidate} />
                            </Slide>
                        ))}
                </Slider>
            )}

            {/* PC가 아니면 커스텀 slider을 사용한다. */}
            {!isDesktop && (
                <CustomSlider
                    candidateList={candidateList}
                    getCurrentIdx={getCurrentIdxSetIndex}
                />
            )}
            <CandidateIntroBox
                candidates={candidateList}
                idx={cardIndex && cardIndex}
            />
        </SlideContainer>
    );
};

const SlideContainer = styled.div`
    margin: 30px 0;
    .slick-list {
        padding: 10px 71px !important;
    }
`;

// 슬라이더 방향표 버튼 스타일 컴포넌트
const ArrowContainer = styled.div`
    cursor: pointer;
    z-index: 99;
    ${mixin.textProps(20, "regular", "black")}
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

const Slide = styled.div`
    width: 100%;
`;

export default CandidateSlider;
