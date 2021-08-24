import mixin from ".././styles/Mixin";
import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

//-----

//-----작성일자 (e.g 방금 전, 1시간전) 계산 라이브러리----
import moment from "moment";
import TimeCounting from "time-counting";
import Boop from "./Boop";
//-----

export default function SlideCard({ post, rank }) {
    // TimeCounting 옵션 설정
    const timeOption = {
        lang: "ko",
        // objectTime: "2020-08-10 06:00:00",
        objectTime: moment().format(`YYYY-MM-DD HH:mm:ss`),
        calculate: {
            justNow: 61,
        },
    };
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
        <CardContainer onClick={onDetailButtonClick}>
            <Preview imageNone={imageNone}>
                <PreviewTitle>{post.title}</PreviewTitle>
                <PreviewContent>{previewContent}</PreviewContent>
            </Preview>
            {!imageNone && (
                <PreviewImage
                    src={`http://3.36.90.60/${post.img_list[0]}`}
                    alt={post.title}
                />
            )}
        </CardContainer>
    );
}

//------스타일 컴포넌트------
const CardContainer = styled.div`
    ${mixin.outline("4px solid", "blue2")};
    width: 372px;
    min-height: 192px;
    border-radius: 96px;
    padding: 2.3em;
    position: relative;
    cursor: pointer;
    ${mixin.flexBox("space-between", "center")};
`;

const PreviewTitle = styled.div`
    font-size: 20px;
    margin-bottom: 10px;
    ${mixin.textProps(20, "extraBold", "black")};
`;

const Preview = styled.div`
    width: ${props => (props.imageNone ? "100%" : "60%")};
`;

const PreviewImage = styled.img`
    width: 6.5em;
    height: 6.5em;
    object-fit: cover;
    border-radius: 50%;
`;

const PreviewContent = styled.p`
    font-size: 14px;
    ${mixin.textProps(14, "semiBold", "gray2")};
    ${mixin.textOverflow()}
`;
