import "../App.css";
import { useState } from "react";
import Slider from "react-slick";

import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import styled from "styled-components";

import SlideCard from "../Elements/SlideCard";

function MainSlider({ postList }) {
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

    const [imageIndex, setImageIndex] = useState(0);

    const settings = {
        infinite: true,
        lazyLoad: true,
        speed: 300,
        slidesToShow: 5,
        centerMode: true,
        centerPadding: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        beforeChange: (current, next) => setImageIndex(next),
    };

    return (
        <SlideContainer>
            <PageTitle>핫이슈</PageTitle>
            <Slider {...settings}>
                {postList &&
                    postList.map((post, idx) => (
                        <div
                            key={idx}
                            className={
                                idx === imageIndex
                                    ? "slide activeSlide"
                                    : "slide"
                            }
                        >
                            <SlideCard post={post} rank={idx + 1} />
                        </div>
                    ))}
            </Slider>
        </SlideContainer>
    );
}

const PageTitle = styled.span`
    font-size: 35px;
    margin-bottom: 20px;
`;
const SlideContainer = styled.div`
    margin: 30px 0;
`;
export default MainSlider;
