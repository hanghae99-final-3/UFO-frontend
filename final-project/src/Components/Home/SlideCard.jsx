import React from "react";
import styled from "styled-components";
import { history } from "../../Redux/configureStore";
import mixin from "../../Styles/Mixin";

export default function SlideCard({ post, rank, active, isDarkTheme }) {
    // 디테일 페이지 바로가기 버튼 이벤트 헨들러
    const onDetailButtonClick = () => {
        history.push(`/freeboard/detail/${post.post_id}`);
    };

    const previewContent = post.content
        .replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi, "")
        .replace(/&nbsp;/gi, "")
        .slice(0, 50);

    const imageNone =
        (post.img_list && post.img_list.length === 0) ||
        post.img_list[0] === "";

    return (
        <CardContainer
            active={active}
            onClick={onDetailButtonClick}
            isDarkTheme={isDarkTheme}
        >
            <Preview imageNone={imageNone}>
                <PreviewTitle active={active}>{post.title}</PreviewTitle>
                <PreviewContent active={active}>
                    {previewContent}
                </PreviewContent>
            </Preview>
            {!imageNone && (
                <PreviewImage
                    src={`https://yzkim9501.site/${post.img_list[0]}`}
                    alt={post.title}
                />
            )}
        </CardContainer>
    );
}

//------스타일 컴포넌트------
const CardContainer = styled.div`
    ${mixin.outline("4px solid", "blue2")};
    border-radius: 96px;
    padding: 2.3em;
    position: relative;
    cursor: pointer;
    margin-bottom: 10px;
    ${props => (props.isDarkTheme ? mixin.darkBoxShadow() : mixin.boxShadow())};
    ${mixin.flexBox("space-between", "center")};
    ${props =>
        props.active &&
        `
            background:${props.theme.color.mainBlue};
        `};
    ${props =>
        props.active
            ? mixin.outline("4px solid", "mainBlue")
            : mixin.outline("4px solid", "blue2")};

    @media ${({ theme }) => theme.mobile} {
        padding: ${({ theme }) => theme.calRem(20)};
    }
`;

const PreviewTitle = styled.div`
    font-size: 20px;
    margin-bottom: 10px;
    ${props =>
        props.active
            ? mixin.textProps(20, "extraBold", "white")
            : mixin.textProps(20, "extraBold", "gray2")}

    @media ${({ theme }) => theme.mobile} {
        ${mixin.textOverflow()}
        ${props =>
            props.active
                ? mixin.textProps(16, "extraBold", "white")
                : mixin.textProps(16, "extraBold", "gray2")}
    }
`;

const Preview = styled.div`
    width: ${props => (props.imageNone ? "100%" : "60%")};
`;

const PreviewImage = styled.img`
    width: 4rem;
    height: 4rem;
    object-fit: cover;
    border-radius: 50%;
`;

const PreviewContent = styled.p`
    font-size: 14px;
    ${mixin.textProps(14, "semiBold", "gray2")};
    ${mixin.textboxOverflow(2)}
    ${props =>
        props.active
            ? mixin.textProps(20, "regular", "blue3")
            : mixin.textProps(20, "regular", "gray3")}

@media ${({ theme }) => theme.mobile} {
        ${props =>
            props.active
                ? mixin.textProps(12, "regular", "blue3")
                : mixin.textProps(12, "regular", "gray3")}
    }
`;
