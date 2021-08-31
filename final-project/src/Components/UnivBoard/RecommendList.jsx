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
    const isDarkTheme = useSelector(state => state.user.isDarkTheme); //다크모드
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIssuePostListDB());
    }, []);

    return (
        <>
            <HeadingWrapper isDarkTheme={isDarkTheme}>
                <Heading isDarkTheme={isDarkTheme}>오늘의 추천글</Heading>
            </HeadingWrapper>
            <IssueBoardBox
                issueList={issuePostList && issuePostList.slice(0, 6)}
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
    ${props =>
        mixin.outline(
            "1px solid",
            props.isDarkTheme ? "gray1" : "mainGray",
            "bottom",
        )}

    //모바일 사이즈
     @media ${({ theme }) => theme.mobile} {
        margin-top: 48px;
        padding-bottom: 8px;
    }
`;
const Heading = styled.span`
    ${props =>
        mixin.textProps(30, "extraBold", props.isDarkTheme ? "white" : "black")}

    //모바일 사이즈
    @media ${({ theme }) => theme.mobile} {
        ${props =>
            mixin.textProps(
                22,
                "extraBold",
                props.isDarkTheme ? "white" : "black",
            )}
    }
`;
export default RecommendList;
