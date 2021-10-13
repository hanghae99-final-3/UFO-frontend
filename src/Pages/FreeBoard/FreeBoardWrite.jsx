import React from "react";

//컴포넌트
import BoardWrite from "../../Components/Board/BoardWrite";

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
