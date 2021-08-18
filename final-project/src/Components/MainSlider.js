import React from "react";
import Slider from "react-slick";
import { useState } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Boop from "../Elements/Boop";
import SlideCard from "../Elements/SlideCard";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import mixin from "../styles/Mixin";

const MainSlider = ({ postList }) => {
    //슬라이더 우측 방향으로 이동
    const NextArrow = ({ onClick }) => {
        return (
            <ArrowContainer direction="next" onClick={onClick}>
                <Boop rotation={0} timing={200} x={5} y={0}>
                    <FaArrowRight />
                </Boop>
            </ArrowContainer>
        );
    };

    //슬라이더 좌측 방향으로 이동
    const PrevArrow = ({ onClick }) => {
        return (
            <ArrowContainer direction="prev" onClick={onClick}>
                <Boop rotation={0} timing={200} x={-5} y={0}>
                    <FaArrowLeft />
                </Boop>
            </ArrowContainer>
        );
    };

    // 각각의 슬라이드 index  번호
    const [imageIndex, setImageIndex] = useState(0);

    //  슬라이더 작동 환경 설정
    const settings = {
        infinite: true,
        lazyLoad: true,
        speed: 300,
        slidesToShow: 3,
        centerMode: true,
        centerPadding: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        beforeChange: (current, next) => setImageIndex(next),
    };

    return (
        <SlideContainer>
            <PageTitle>인기 게시글</PageTitle>
            <Slider {...settings}>
                {postList &&
                    postList.map((post, idx) => (
                        <CardContainer key={idx} active={idx === imageIndex}>
                            <SlideCard
                                post={post.free_board}
                                rank={idx + 1}
                                active={idx === imageIndex}
                            />
                        </CardContainer>
                    ))}
            </Slider>
        </SlideContainer>
    );
};

//---------스타일 컴포넌트---------
const PageTitle = styled.span`
    font-size: 35px;
    margin-bottom: 20px;
`;

const SlideContainer = styled.div`
    margin: 70px 0;
`;

// 슬라이더 카드 컨테이너
const CardContainer = styled.div`
    transform: ${props => (props.active ? `scale(1)` : `scale(0.6)`)};
    opacity: ${props =>
        props.active
            ? `opacity: 1`
            : `    opacity: 0.5;
    `};
    ${props =>
        props.active &&
        `div{
            background:${props.theme.color.blue1};
            border:none;
            color : white;
        }`};
    transition: ${props => !props.active && "transform 300ms"};
    img {
        width: ${props => !props.active && "width:20rem"};
        margin: ${props => !props.active && "margin: 0 auto"};
    }
`;

// 슬라이더 방향표 버튼 스타일 컴포넌트
const ArrowContainer = styled.div`
    background-color: #fff;
    position: absolute;
    cursor: pointer;
    z-index: 10;

    svg {
        transition: color 300ms;
        :hover {
            color: #afb1ff;
        }
    }
    right: ${props => props.direction === "next" && "0%"};
    left: ${props => props.direction === "prev" && "0%"};
    top: 50%;
`;

export default MainSlider;
