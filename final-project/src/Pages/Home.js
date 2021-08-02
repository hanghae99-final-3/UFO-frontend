import React, { useEffect } from "react";
import styled from "styled-components";
import SearchBox from "../Components/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { getFreeListDB } from "../redux/async/freeBoard";

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
