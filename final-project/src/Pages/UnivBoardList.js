import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUnivBoardDB } from "../redux/async/univBoardAsync";
import { history } from "../redux/configureStore";
const UniBoardList = props => {
    const dispatch = useDispatch();
    const postList = useSelector(state => state.univBoard.list);
    useEffect(() => {
        dispatch(getUnivBoardDB());
    }, []);
    return (
        <React.Fragment>
            {postList &&
                postList.map((post, idx) => {
                    return (
                        <div
                            key={idx}
                            onClick={() => {
                                history.push(
                                    `/univBoard/detail/${post.post_id}`,
                                );
                            }}
                            style={{
                                margin: "10px",
                                display: "flex",
                                border: "1px solid",
                                cursor: "pointer",
                            }}
                        >
                            <span>title : {post.title}/</span>
                            <span>content : {post.content}/</span>
                            <span>id : {post.post_id}</span>
                        </div>
                    );
                })}
            <table>
                <thead>
                    <tr>
                        <th>Number / </th>
                        <th>Title / </th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>title</td>
                        <td>category</td>
                    </tr>
                    <tr></tr>
                </tbody>
            </table>
        </React.Fragment>
    );
};

export default UniBoardList;
