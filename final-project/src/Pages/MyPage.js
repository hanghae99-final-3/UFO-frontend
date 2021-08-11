import React from "react";
import MypageAccount from "../Components/Mypage/MypageAccount";
import MypageHeader from "../Components/Mypage/MypageHeader";

const MyPage = props => {
    return (
        <React.Fragment>
            <MypageHeader />
            <MypageAccount />
        </React.Fragment>
    );
};

export default MyPage;
