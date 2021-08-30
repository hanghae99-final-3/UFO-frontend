import React, { useState } from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//애니메이션
import Boop from "../../Elements/Animations/Boop";

//아이콘
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

//컴포넌트
import SlideCard from "./SlideCard";

const MainSlider = ({ postList }) => {
    const isMobile = document.documentElement.clientWidth < 798 ? true : false;

    const isTablet =
        document.documentElement.clientWidth >= 798 &&
        document.documentElement.clientWidth < 1080
            ? true
            : false;

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
    let settings = {
        infinite: true,
        lazyLoad: true,
        speed: 230,
        slidesToShow: 3,
        centerMode: true,
        centerPadding: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        beforeChange: (current, next) => setImageIndex(next),
    };

    //모바일
    if (isMobile) {
        settings = {
            infinite: true,
            lazyLoad: true,
            speed: 230,
            slidesToShow: 1,
            centerMode: true,
            beforeChange: (current, next) => setImageIndex(next),
        };
    }

    //태블릿
    if (isTablet) {
        settings = {
            infinite: true,
            lazyLoad: true,
            speed: 230,
            slidesToShow: 3,
            centerMode: true,
            beforeChange: (current, next) => setImageIndex(next),
        };
    }

    return (
        <SlideContainer>
            <PageTitle>인기 게시글🔥</PageTitle>
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

const SlideContainer = styled.div`
    margin: ${({ theme }) => theme.calRem(70)} 0;
    @media ${({ theme }) => theme.mobile} {
        margin: ${({ theme }) => theme.calRem(40)} 0;
        .slick-slide {
            margin-top: ${({ theme }) => theme.calRem(16)};
            width: 10rem;
        }
    }
`;

const PageTitle = styled.span`
    ${mixin.textProps(30, "extraBold", "black")}

    @media ${({ theme }) => theme.mobile} {
        ${mixin.textProps(22, "extraBold", "black")}
    }
`;

// 슬라이더 카드 컨테이너
const CardContainer = styled.div`
    transform: ${props => (props.active ? `scale(1)` : `scale(0.6)`)};
    opacity: ${props =>
        props.active
            ? `opacity: 1`
            : `    opacity: 0.5;
    `};
    transition: ${props => !props.active && "transform 300ms"};
    img {
        width: ${props => !props.active && "width:20rem"};
        margin: ${props => !props.active && "margin: 0 auto"};
    }

    @media ${({ theme }) => theme.mobile} {
        transform: none;
        padding: 0 1em;
    }
`;

// 슬라이더 방향표 버튼 스타일 컴포넌트
const ArrowContainer = styled.div`
    cursor: pointer;
    z-index: 10;
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

    @media ${({ theme }) => theme.mobile} {
        display: none;
    }
`;

export default MainSlider;
