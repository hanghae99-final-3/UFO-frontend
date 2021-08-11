import React from "react";
import { Button } from "@material-ui/core";

const SocialLogin = ({ toggleLoginMode }) => {
    return (
        <React.Fragment>
            <Button
                style={{
                    marginTop: "20px",
                    width: "320px",
                    height: "40px",
                    borderRadius: "10px",
                }}
                variant="outlined"
                onClick={toggleLoginMode}
            >
                이메일로 로그인
            </Button>
            <Button
                style={{
                    marginTop: "20px",
                    width: "320px",
                    height: "40px",
                    borderRadius: "10px",
                }}
                variant="outlined"
            >
                <a href="http://3.36.90.60/auth/kakao">
                    카카오 계정으로 로그인
                </a>
            </Button>
            <Button
                style={{
                    marginTop: "20px",
                    width: "320px",
                    height: "40px",
                    borderRadius: "10px",
                }}
                variant="outlined"
            >
                페이스북 계정으로 로그인
            </Button>
            <Button
                style={{
                    marginTop: "20px",
                    width: "320px",
                    height: "40px",
                    borderRadius: "10px",
                }}
                variant="outlined"
            >
                구글 계정으로 로그인
            </Button>
        </React.Fragment>
    );
};

export default SocialLogin;
