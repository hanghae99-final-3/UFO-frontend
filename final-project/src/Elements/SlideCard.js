import React from "react";
import categories from "../categories";
import styled from "styled-components";
import { history } from "../redux/configureStore";

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
        <CardContainer>
            {/* <RankSpan style={{}}>{rank}위</RankSpan> */}
            <InnerContentContainer>
                <TitleSpan>{post.title}</TitleSpan>
                <CardMidBox>
                    <TagSpan>
                        # {categories.freeBoardTags[post.category]}
                    </TagSpan>
                    <DateSpan>
                        {TimeCounting(post.createdAt, timeOption)}
                    </DateSpan>
                </CardMidBox>
                <PreviewSpan
                    className="ck-content"
                    dangerouslySetInnerHTML={{
                        __html: post.content,
                    }}
                ></PreviewSpan>

                <CardBottomBox>
                    <Boop scale={1.05}>
                        <DetailButton onClick={onDetailButtonClick}>
                            자세히 보기
                        </DetailButton>
                    </Boop>
                    <IconBox>
                        <VisibilityIcon />
                        <ViewCountSpan>{post.view_count}</ViewCountSpan>
                    </IconBox>
                </CardBottomBox>
            </InnerContentContainer>
        </CardContainer>
    );
}

//------스타일 컴포넌트------
const CardContainer = styled.div`
    border: 1px solid;
    width: 372px;
    height: 192px;
    border-radius: 96px;
    padding: 45px 51px 0 51px;
    position: relative;
`;
const InnerContentContainer = styled.div``;

const CardMidBox = styled.div``;
const CardBottomBox = styled.div`
    display: flex;
    font-size: 12px;
`;

const IconBox = styled.div`
    display: flex;
    align-items: center;
    span {
        line-height: 1;
    }
    svg {
        font-size: 12px;
        margin: 0 5px 0 10px;
    }
`;

const TagSpan = styled.span`
    font-size: 12px;
`;

const TitleSpan = styled.span`
    font-size: 20px;
`;

const DateSpan = styled.span`
    font-size: 12px;
`;

const ViewCountSpan = styled.span``;

const PreviewSpan = styled.span`
    font-size: 14px;
`;

const DetailButton = styled.button`
    font-size: 12px;
    background: none;
`;

const RankSpan = styled.span`
    position: absolute;
    top: 3%;
    left: 90%;
`;
