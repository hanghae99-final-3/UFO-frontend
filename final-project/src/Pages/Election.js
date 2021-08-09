import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getElectionListDB } from "../redux/async/election";

const Election = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    useEffect(() => {
        dispatch(getElectionListDB());
    }, []);
    return (
        <>
            <input type="file" onChange={e => console.log(e.target.files[0])} />
            <Freeview>
                <img src="" alt="" />
            </Freeview>
        </>
    );
};

const Freeview = styled.div`
    width: 300px;
    height: 300px;
    background: pink;
`;

export default Election;
