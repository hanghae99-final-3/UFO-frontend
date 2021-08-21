import React from "react";
import styled from "styled-components";
import mixin from "../../styles/Mixin";
import { history } from "../../redux/configureStore";

import Boop from "../../Elements/Boop";

const UnvotedBox = ({ list }) => {
    return (
        <Container>
            {!list ? (
                <p>모든 투표가 완료되었어요!</p>
            ) : (
                list.map(post => (
                    <Boop timing={200} y={-7}>
                        <UnvotedCard
                            onClick={() =>
                                history.push(
                                    `/election/detail/${post.election_id}`,
                                )
                            }
                        >
                            <span>{post.name}</span>
                        </UnvotedCard>
                    </Boop>
                ))
            )}
        </Container>
    );
};

const Container = styled.div`
    padding: 15px 0;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 18px;
`;

const UnvotedCard = styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.color.mainGray};
    border-radius: 35px;
    padding: 30px;
    cursor: pointer;

    span {
        ${mixin.textboxOverflow(1)}
    }
`;

export default UnvotedBox;
