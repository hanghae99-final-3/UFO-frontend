import React from "react";
import styled from "styled-components";

const Home = () => {
    return (
        <HomeContainer>
            <SearchContainer></SearchContainer>
            <BoardContainer>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </BoardContainer>
        </HomeContainer>
    );
};

const HomeContainer = styled.div``;
const SearchContainer = styled.div`
    padding: 20px 0;
    background: pink;
`;
const BoardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin: 20px 0;
    > div {
        background: yellowgreen;
        height: 200px;
    }
    > div:nth-child(3) {
        grid-column: 1/-1;
    }
`;

export default Home;
