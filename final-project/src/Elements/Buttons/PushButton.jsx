import React from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";

const PushButton = ({ onClick }) => {
    return (
        <Button onClick={onClick}>
            <SpanShadow></SpanShadow>
            <EdgeSpan></EdgeSpan>
            <FontSpan>좋아요</FontSpan>
        </Button>
    );
};

//------스타일 컴포넌트-------

const SpanShadow = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    width: 56px;
    height: 24px;
    border-radius: 60px;
    /* background: hsl(0deg 0% 0% / 0.25); */
    will-change: transform;
    transform: translateY(1px);
    transition: transform 600ms cubic-bezier(0.5, 0.7, 0.5, 1);
`;

const FontSpan = styled.span`
    display: block;
    position: relative;
    padding: 5px 15px;
    border-radius: 50px;
    ${mixin.textProps(11, "semiBold", "white")};
    color: white;
    background: hsl(252deg 100% 58%);
    will-change: transform;
    transform: translateY(-4px);
    transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
`;

const EdgeSpan = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 40px;
    background: linear-gradient(
        to left,
        hsl(252deg 100% 16%) 0%,
        hsl(252deg 100% 32%) 8%,
        hsl(252deg 100% 32%) 92%,
        hsl(252deg 100% 16%) 100%
    );
`;

const Button = styled.button`
    margin-top: 2px;
    position: relative;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    outline-offset: 4px;
    transition: filter 250ms;
    :hover {
        filter: brightness(110%);
        ${FontSpan} {
            transform: translateY(-6px);
            transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
            ${SpanShadow} {
                transform: translateY(4px);
                transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
            }
        }
    }
    :active {
        ${FontSpan} {
            transform: translateY(-2px);
            transition: transform 34ms;
        }
        ${SpanShadow} {
            transform: translateY(1px);
            transition: transform 34ms;
        }
    }
    :focus {
        :not(:focus-visible) {
            outline: none;
        }
    }
`;

export default PushButton;
