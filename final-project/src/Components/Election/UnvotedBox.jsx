import React from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import { history } from "../../Redux/configureStore";
import { useParams } from "react-router";

//애니메이션
import Boop from "../../Elements/Animations/Boop";

const UnvotedBox = ({ list }) => {
    // 현재 진행중이지만, 투표를 하지 않은 게시글을 보여줍니다.

    const { id: postId } = useParams(); //게시글아이디
    return (
        <Container>
            {list.length < 1 ? (
                <CompleteMessage>투표를 모두 완료했어요!</CompleteMessage>
            ) : (
                <GridContainer>
                    {list.map((post, idx) => (
                        <Boop timing={200} y={-7} key={idx}>
                            <UnvotedCard
                                // 현재 불러온 게시글들 중 id가 현재게시글과 같은 것이 있다면 selected를 true로 반환합니다.
                                selected={post.election_id === Number(postId)}
                                onClick={() =>
                                    history.push(
                                        `/election/detail/${post.election_id}`,
                                    )
                                }
                            >
                                <span>{post.name}</span>
                            </UnvotedCard>
                        </Boop>
                    ))}
                </GridContainer>
            )}
        </Container>
    );
};

const Container = styled.div`
    padding: 15px 0;
    text-align: center;
`;

const CompleteMessage = styled.p`
    ${mixin.textProps(20, "extraBold", "danger")};
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 18px;
`;

const UnvotedCard = styled.div`
    width: 100%;
    ${props =>
        props.selected
            ? mixin.outline("3px solid", "mainMint")
            : mixin.outline("3px solid", "mainGray")}
    border-radius: 35px;
    padding: 30px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.color.mainGray};
    span {
        ${mixin.textboxOverflow(1)}
    }
`;

export default UnvotedBox;
