import React from "react";
import styled from "styled-components";
import mixin from "../styles/Mixin";
const MainSearchList = props => {
    return (
        <React.Fragment>
            <TitleHeading>title heading</TitleHeading>
            <PostTitle>post title</PostTitle>
            <AnnounceTitle>AnnounceTitle</AnnounceTitle>
            <SmallTag>SmallTag</SmallTag>
        </React.Fragment>
    );
};

const LargeTag = styled.span`
    ${mixin.textProps(30, "extraBold", "black")}
`;
const TitleHeading = styled.span`
    ${mixin.textProps(30, "extraBold", "black")}
`;
const PostTitle = styled.p`
    ${props =>
        props.title || props.tag
            ? mixin.textProps(14, "semiBold", "gray2")
            : mixin.textProps(20, "semiBold", "gray2")}
`;
const AnnounceTitle = styled.p`
    ${props =>
        props.title || props.tag
            ? mixin.textProps(14, "semiBold", "gray2")
            : mixin.textProps(20, "semiBold", "gray2")}
`;
const SmallTag = styled.span`
    margin-right: 20px;
    border-radius: 16px;
    background-color: ${props =>
        props.announcement ? props.theme.color.mint : "white"};
    height: ${props => (props.title || props.tag ? " 22px" : "32px")};
    min-width: ${props => (props.title || props.tag ? " 74px" : "94px")};
    line-height: ${props => (props.title || props.tag ? "18px" : "28px")};
    ${props =>
        props.title || props.tag
            ? mixin.textProps(12, "semiBold", "gray1", "center")
            : mixin.textProps(
                  18,
                  "semiBold",
                  props.announcement ? "black" : "gray1",
                  "center",
              )}
    ${props =>
        mixin.outline("2px solid", props.announcement ? "mint" : "blue2")}
`;

const AnnounceTag = styled.span`
    margin-right: 20px;
    border-radius: 16px;
    background-color: ${props => props.theme.color.mint};
    height: ${props => (props.title || props.tag ? " 22px" : "32px")};
    min-width: ${props => (props.title || props.tag ? " 74px" : "94px")};
    line-height: ${props => (props.title || props.tag ? "18px" : "28px")};
    ${props =>
        props.title || props.tag
            ? mixin.textProps(12, "semiBold", "black", "center")
            : mixin.textProps(18, "semiBold", "gray1", "center")};

    ${mixin.outline("2px solid", "mint")}
`;

// 더보기 버튼
const More = styled.span`
    ${mixin.textProps(14, "semiBold", "gray3")}
    :hover {
        cursor: pointer;
    }
`;

// 텍스트

const Content = styled.div``;

const PostContainer = styled.div`
    display: grid;
    grid-template-columns: max-content 1fr max-content;
    margin-bottom: 12px;
    cursor: pointer;
`;

const IconContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 40px);
`;

const Icon = styled.div`
    display: flex;
    align-items: center;
    span {
        line-height: 1;
        font-size: ${({ theme }) => theme.fontSize["12"]};
    }
    svg {
        font-size: ${props => (props.title || props.tag ? "17px" : "20px")};
    }
`;

export default MainSearchList;
