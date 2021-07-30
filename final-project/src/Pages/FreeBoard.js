import React, { useEffect } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { getFreeListDB } from "../redux/async/freeBoard";

/**
 * @author kwonjiyeong
 * @param 없음
 * @returns 자유게시판 뷰
 * @역할 자유게시판 뷰 렌더링
 * @필수값 없음
 */
const FreeBoard = () => {
    //----자유게시판 목록 불러와서 state에 주입하기
    const dispatch = useDispatch();
    const list = useSelector(state => state.freeBoard.list);
    useEffect(() => {
        //자유게시판 목록 가져오기
        dispatch(getFreeListDB());
    }, []);
    //----

    return (
        <>
            <FreeBoardTable>
                <TableRow>
                    <div>
                        <span>제목</span>
                    </div>
                    <div>
                        <span>내용</span>
                    </div>
                    <div>
                        <span>ID</span>
                    </div>
                </TableRow>
                {list &&
                    list.map(ele => (
                        <TableRow
                            key={ele.post_id}
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                history.push(
                                    `/freeboard/detail/${ele.post_id}`,
                                );
                            }}
                        >
                            <div>
                                <span>{ele.title}</span>
                            </div>
                            <div>
                                <span>{ele.content}</span>
                            </div>
                            <div>
                                <span>{ele.post_id}</span>
                            </div>
                        </TableRow>
                    ))}
            </FreeBoardTable>
            <button onClick={() => history.push("/freeboard/write")}>
                작성하기
            </button>
        </>
    );
};

const FreeBoardTable = styled.div`
    border: 2px solid gray;
    > div:not(:last-child) {
        border-bottom: 1px solid gray;
    }
`;

const TableRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    > div {
        padding: 20px;
    }
    > div:not(:last-child) {
        border-right: 1px solid gray;
    }
`;

export default FreeBoard;
