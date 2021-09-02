import React, { useState } from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import theme from "../../Styles/theme";
import { history } from "../../Redux/configureStore";
import { useParams } from "react-router";

//애니메이션
import Boop from "../../Elements/Animations/Boop";

const UnvotedBox = ({ list, isDarkTheme, isTest }) => {
    // 현재 진행중이지만, 투표를 하지 않은 게시글을 보여줍니다.

    const { id: postId } = useParams(); //게시글아이디
    const [isMore, setIsMore] = useState(false);
    //데스크탑 사이즈인지 아닌지에 대한 판별값입니다.
    const isDesktop =
        document.documentElement.clientWidth >= 1080 ? true : false;

    const onClickUnVotedCard = postId => {
        if (isTest) return history.push("/election/test/detail");
        history.push(`/election/detail/${postId}`);
    };

    return (
        <Container isDesktop={isDesktop}>
            {list.length < 1 ? (
                <CompleteMessage>투표를 모두 완료했어요!</CompleteMessage>
            ) : (
                <>
                    <GridContainer isMore={isMore}>
                        {list.map((post, idx) => (
                            <Boop timing={200} y={-7} key={idx}>
                                <UnvotedCard
                                    isDarkTheme={isDarkTheme}
                                    // 현재 불러온 게시글들 중 id가 현재게시글과 같은 것이 있다면 selected를 true로 반환합니다.
                                    isSelected={
                                        post.election_id === Number(postId)
                                    }
                                    onClick={() =>
                                        onClickUnVotedCard(post.election_id)
                                    }
                                >
                                    <span>{post.name}</span>
                                </UnvotedCard>
                            </Boop>
                        ))}
                    </GridContainer>
                    {/* 데스크탑에서는 7개 이상부터 더보기버튼이 렌더링, 아닌경우 4개 이상부터 렌더링됩니다. */}
                    {isDesktop && list.length > 7 && (
                        <>
                            {isMore ? (
                                <More
                                    isDarkTheme={isDarkTheme}
                                    isSelected
                                    onClick={() => setIsMore(false)}
                                >
                                    숨기기
                                </More>
                            ) : (
                                <More
                                    isDarkTheme={isDarkTheme}
                                    onClick={() => setIsMore(true)}
                                >
                                    더보기
                                </More>
                            )}
                        </>
                    )}
                    {!isDesktop && list.length > 4 && (
                        <>
                            {isMore ? (
                                <More
                                    isDarkTheme={isDarkTheme}
                                    isSelected
                                    onClick={() => setIsMore(false)}
                                >
                                    숨기기
                                </More>
                            ) : (
                                <More
                                    isDarkTheme={isDarkTheme}
                                    onClick={() => setIsMore(true)}
                                >
                                    더보기
                                </More>
                            )}
                        </>
                    )}
                </>
            )}
        </Container>
    );
};

const Container = styled.div`
    text-align: center;
`;

const CompleteMessage = styled.p`
    ${mixin.textProps(20, "extraBold", "danger")};
    @media ${({ theme }) => theme.mobile} {
        ${mixin.textProps(16, "extraBold", "danger")};
    }
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: ${({ theme }) => theme.calRem(25)};

    @media ${({ theme }) => theme.mobile} {
        ${mixin.textProps(16, "extraBold", "danger")};
        grid-template-columns: repeat(2, 1fr);
        gap: ${({ theme }) => theme.calRem(16)};
        ${props =>
            props.isMore
                ? `height:auto; overflow:visible;`
                : `height: ${theme.calRem(160)}; overflow:hidden;`}
    }
`;

const UnvotedCard = styled.div`
    width: 100%;
    ${props =>
        props.isSelected
            ? mixin.outline("3px solid", "mainMint")
            : props.isDarkTheme
            ? mixin.outline("3px solid", "blue2")
            : mixin.outline("3px solid", "mainGray")}
    border-radius: 35px;
    padding: ${({ theme }) => theme.calRem(30)};
    cursor: pointer;
    background-color: ${props =>
        props.isDarkTheme
            ? props.theme.color.black
            : props.theme.color.mainGray};
    ${props => (props.isDarkTheme ? mixin.darkBoxShadow() : mixin.boxShadow())}

    span {
        ${mixin.textboxOverflow(1)}
        ${props =>
            mixin.textProps(
                16,
                "extraBold",
                props.isDarkTheme ? "mainGray" : "gray1",
            )};
    }

    @media ${({ theme }) => theme.mobile} {
        padding: ${({ theme }) => theme.calRem(17)};
    }
`;

const More = styled.button`
    padding: 0 10px;
    height: 32px;
    min-width: 80px;
    border-radius: 20px;
    ${props =>
        mixin.textProps(18, "semiBold", props.isDarkTheme ? "black" : "white")};
    margin-top: ${({ theme }) => theme.calRem(30)};
    ${mixin.boxShadow()}
    background: ${props =>
        props.isSelected
            ? props.theme.color.mainBlue
            : props.theme.color.blue1};

    @media ${({ theme }) => theme.mobile} {
        margin-top: ${({ theme }) => theme.calRem(16)};
        min-width: ${({ theme }) => theme.calRem(64)};
        height: ${({ theme }) => theme.calRem(24)};
        ${props =>
            mixin.textProps(
                11,
                "semiBold",
                props.isDarkTheme ? "black" : "white",
            )};
    }
`;
export default UnvotedBox;
