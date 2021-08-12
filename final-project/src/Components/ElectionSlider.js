import { useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";

import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const ElectionSlider = ({ candidateList }) => {
    const NextArrow = ({ onClick }) => {
        return (
            <div className="arrow next" onClick={onClick}>
                <FaArrowRight />
            </div>
        );
    };

    const PrevArrow = ({ onClick }) => {
        return (
            <div className="arrow prev" onClick={onClick}>
                <FaArrowLeft />
            </div>
        );
    };

    const [cardIndex, setCardIndex] = useState(0);

    const settings = {
        infinite: true,
        lazyLoad: true,
        speed: 300,
        swipeToSlide: true, //swipe한 만큼 slide를 움직이게 하는 속성
        slidesToShow: candidateList.length < 4 ? 1 : 3, //후보자가 4명 미만이면, 슬라이드를 1개씩 보여주고, 아니면 3개씩 보여준다.
        centerMode: true,
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
                        <SlideCard
                            key={idx}
                            className={
                                idx === cardIndex
                                    ? "slide activeSlide"
                                    : "slide"
                            }
                        >
                            <img
                                src={`http://3.36.90.60/${candidate.photo}`}
                                alt={candidate.photo}
                            />
                            <span>{candidate.name}</span>
                        </SlideCard>
                    ))}
            </Slider>
            <CandidateCard>
                <CandidateImage>
                    <img
                        src={`http://3.36.90.60/${candidateList[cardIndex].photo}`}
                        alt={candidateList[cardIndex].photo}
                    />
                </CandidateImage>
                <CandidateInfo>
                    <h3>
                        기호 {cardIndex + 1}번 {candidateList[cardIndex].name}
                    </h3>
                    <div>
                        <span>학과</span>
                        <p>{candidateList[cardIndex].major}</p>
                    </div>
                    <div>
                        <span>소개</span>
                        <p>{candidateList[cardIndex].content}</p>
                    </div>
                </CandidateInfo>
            </CandidateCard>
        </SlideContainer>
    );
};

const SlideContainer = styled.div`
    margin: 30px 0;
`;

const SlideCard = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: auto;
    display: block !important;
    width: 300px !important;
    height: 300px;
    img {
        width: 100%;
        height: calc(100% - 30px);
        object-fit: cover;
    }
`;

const CandidateCard = styled.div`
    display: flex;
`;

const CandidateImage = styled.div`
    height: 500px;
    width: 500px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const CandidateInfo = styled.div`
    padding: 20px 10px;
    h3 {
        margin-bottom: 30px;
        font-size: 30px;
        color: #707070;
    }
    div {
        width: 100%;
        display: flex;
        justify-content: space-between;
        span {
            font-weight: bold;
            min-width: 50px;
        }
        p {
            width: 100%;
        }
    }
`;

export default ElectionSlider;
