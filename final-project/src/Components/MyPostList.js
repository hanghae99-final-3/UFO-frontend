import React, { useState, useEffect } from "react";
import instance from "../api";
import MyPostBoardBox from "./MyPostBoardBox";

const MyPostList = () => {
    const [currentPage, setCurrentPage] = useState(1); //초기 페이지 값
    const [postList, setPostList] = useState([]); // 게시물 리스트 배열
    const [totalPage, setTotalPage] = useState(0); // 총 게시물 페이지 ==> 서버가 보내주는 값으로 변경 예정
    const [isLoading, setIsLoading] = useState(false); // loading 상태 값
    const [nextPage, setNextPage] = useState(2); // 다음 페이지가 있는지 확인, 만약 total page보다 작다면 무한스크롤 해제

    // 게시물 요청시 옵션 정보 (페이수 per 게시물, 현재 페이지 )
    const req = {
        pageNum: currentPage,
        pageSize: 12,
    };
    // 게시글 api 요청 콜
    const requestCall = async ({ pageNum, pageSize }) => {
        setIsLoading(true);
        await instance
            .get("/api/user/my-post", {
                params: {
                    pageNum,
                    pageSize,
                },
            })
            .then(res => {
                if (res.data.ok) {
                    console.log(res.data);
                    setPostList(prev => [...prev, ...res.data.my_posts]);
                    setTotalPage(res.data.totalPage);
                    setNextPage(currentPage + 1);
                    setCurrentPage(prev => prev + 1);
                }
            });
        setIsLoading(false);
    };

    // 무한스크롤 다음 페이지 요청 핸들러
    const nextCall = () => {
        requestCall(req);
    };

    useEffect(() => {
        requestCall(req);
    }, []);

    return (
        <React.Fragment>
            <MyPostBoardBox
                nextCall={nextCall}
                postList={postList}
                is_next={nextPage <= totalPage ? true : false}
                size={100}
                isLoading={isLoading}
            />
        </React.Fragment>
    );
};

export default MyPostList;
