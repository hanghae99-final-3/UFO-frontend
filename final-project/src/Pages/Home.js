import React, { useEffect } from "react";
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
        <div>
            <SearchBox
                freeBoardPostList={freeBoardPostList && freeBoardPostList}
            />
        </div>
    );
};

export default Home;
