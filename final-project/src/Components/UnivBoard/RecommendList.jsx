import React, { useEffect } from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import { useDispatch, useSelector } from "react-redux";

//통신
import { getIssuePostListDB } from "../../Redux/Async/freeBoard";

//컴포넌트
import IssueBoardBox from "./IssueBoardBox";

const RecommendList = () => {
    const issuePostList = useSelector(state => state.freeBoard.issueList);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIssuePostListDB());
    }, []);

    return (
        <>
            <HeadingWrapper>
                <Heading>오늘의 추천글</Heading>
            </HeadingWrapper>
            <IssueBoardBox
                issueList={issuePostList && issuePostList.slice(0, 5)}
                preview={true}
                boardName="freeboard"
            />
        </>
    );
};

const HeadingWrapper = styled.div`
    margin-top: 57px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    ${mixin.outline("1px solid", "mainGray", "bottom")}
`;
const Heading = styled.span`
    ${mixin.textProps(30, "extraBold", "black")}
`;
export default RecommendList;
