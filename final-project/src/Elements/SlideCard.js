import mixin from ".././styles/Mixin";
import React from "react";
import categories from "../categories";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import textOverflow from "../styles/Mixin/textStyle";

//----머테이얼 유아이 컴포넌트 & 아이콘------
import VisibilityIcon from "@material-ui/icons/Visibility";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
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

    return (
        <CardContainer onClick={onDetailButtonClick}>
            <InnerContentContainer>
                <TitleSpan>{post.title}</TitleSpan>
                <PreviewSpan
                    className="ck-content"
                    dangerouslySetInnerHTML={{
                        __html: post.content,
                    }}
                ></PreviewSpan>
            </InnerContentContainer>
        </CardContainer>
    );
}

//------스타일 컴포넌트------
const CardContainer = styled.div`
    ${mixin.outline("4px solid", "blue2")};
    width: 372px;
    height: 192px;
    border-radius: 96px;
    padding: 45px 51px 0 51px;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;
const InnerContentContainer = styled.div``;

const TitleSpan = styled.div`
    font-size: 20px;
    margin-bottom: 10px;
`;

const PreviewSpan = styled.span`
    font-size: 14px;
`;
