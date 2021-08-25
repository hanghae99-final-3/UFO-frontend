import React, { useState, useEffect } from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";

import { BiArrowToTop } from "react-icons/bi";

const FloatBox = () => {
    const [isVisible, setIsVisible] = useState(false); //버튼을 보여줄지 말지에 대한 판별값

    const scrollToTop = () => {
        //스크롤을 위로 올리는 함수
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        // Button is displayed after scrolling for 500 pixels
        const toggleVisibility = () => {
            if (window.pageYOffset > 0) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <Container>
            {isVisible && (
                <Button onClick={scrollToTop}>
                    <BiArrowToTop />
                </Button>
            )}
        </Container>
    );
};

const Container = styled.div`
    ${mixin.floatBox("fixed", null, "200px", "100px")}
`;

const Button = styled.button`
    background: ${({ theme }) => theme.color.white};
    width: 60px;
    height: 60px;
    ${mixin.outline("1px solid", "gray3")}
    ${mixin.textProps(40, "regular", "gray3")}
    border-radius: 50%;
    line-height: 1;
    transition: all 0.3s ease;
    :hover {
        ${mixin.textProps(40, "regular", "gray2")}
    }
    svg {
        vertical-align: middle;
    }
`;

export default FloatBox;
