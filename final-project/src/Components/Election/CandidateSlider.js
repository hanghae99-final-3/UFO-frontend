import { useState } from "react";
import styled from "styled-components";
import mixin from "../../styles/Mixin";

//컴포넌트
import CandidateCard from "./CandidateCard";
import CandidateSlide from "./CandidateSlide";

//슬라이더
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

//애니메이션
import Boop from "../../Elements/Boop";
import CandidateIntroBox from "./CandidateIntroBox";

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

    const [cardIndex, setCardIndex] = useState(0);

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

    return (
        <SlideContainer>
            {/* 후보자 슬라이더 */}
            <Slider {...settings}>
                {candidateList &&
                    candidateList.map((candidate, idx) => (
                        <Slide key={idx} active={idx === cardIndex}>
                            <CandidateCard candidate={candidate} />
                        </Slide>
                    ))}
            </Slider>
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

const CandidateDetailBox = styled.div`
    ${mixin.flexBox("center", "center", null, "400px")};
    ${mixin.outline("4px solid", "blue2")}
    border-radius: 200px;
    padding: 70px 0;
    margin: 40px 0 80px 0;
`;

const CandidateImage = styled.div`
    height: 100%;
    margin-right: 30px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 20px;
    }
`;

const CandidateInfo = styled.div`
    height: 100%;
    width: 550px;
`;

const CandidateName = styled.div`
    margin-bottom: 30px;
    strong {
        ${mixin.textProps(30, "extraBold", "black")}
    }
`;
const CandidateIntro = styled.div`
    display: grid;
    grid-template-columns: 50px 1fr;
    gap: 10px;
    ${mixin.textProps(20, "regular", "gray1")}

    span {
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    }
`;

export default CandidateSlider;
