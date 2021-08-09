import React from "react";
import BoardWrite from "../Components/BoardWrite";

/**
 * @author jiyeong
 * @param
 * @returns 자유게시판 게시물 작성페이지 or 수정페이지
 * @역할 자유게시판 게시물 작성페이지 or 수정페이지 렌더링
 * @필수값
 */

const FreeBoardWrite = () => {
    return <BoardWrite boardName="freeboard" />;
};

export default FreeBoardWrite;
