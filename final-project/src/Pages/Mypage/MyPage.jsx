import React from "react";
import { Helmet } from "react-helmet";

//컴포넌트
import MypageAccount from "../../Components/Mypage/MypageAccount";
import MypageHeader from "../../Components/Mypage/MypageHeader";

const MyPage = props => {
    return (
        <React.Fragment>
            <Helmet>
                <title>UFO - 마이 페이지</title>
            </Helmet>
            <MypageHeader />
            <MypageAccount />
        </React.Fragment>
    );
};

export default MyPage;
