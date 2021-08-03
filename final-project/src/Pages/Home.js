import React, { useEffect } from "react";
import styled from "styled-components";
import SearchBox from "../Components/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { getFreeListDB } from "../redux/async/freeBoard";
import BoardBox from "../Components/BoardBox";

const Home = () => {
    const dispatch = useDispatch();
    const freeBoardPostList = useSelector(state => state.freeBoard.list);
    useEffect(() => {
        dispatch(getFreeListDB());
    }, []);
    return (
        <HomeContainer>
            <SearchContainer>
                <SearchBox
                    freeBoardPostList={freeBoardPostList && freeBoardPostList}
                />
            </SearchContainer>
            <BoardContainer>
                <BoardBox />
                <BoardBox />
                <BoardBox />
                <BoardBox />
                <BoardBox />
            </BoardContainer>
        </HomeContainer>
    );
};

const HomeContainer = styled.div``;
const SearchContainer = styled.div`
    padding: 50px 0;
`;
const BoardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    background: #d2d2d2;
    gap: 2px;
    margin: 20px 0;
    border: 2px solid #d2d2d2;
    > div {
        background: #fff;
        padding: 50px;
    }
    > div:nth-child(3) {
        grid-column: 1/-1;
    }
`;

export default Home;
