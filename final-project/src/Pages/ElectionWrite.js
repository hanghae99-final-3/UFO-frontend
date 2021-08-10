import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
    },
    heading: {
        fontSize: theme.typography.pxToRem(20), //폰트크기
        fontWeight: theme.typography.fontWeightBold, //폰트굵기
        marginRight: theme.typography.pxToRem(10),
    },
    button: {
        padding: theme.spacing(1),
    },
}));

const ElectionWrite = () => {
    const classes = useStyles();
    const [post, setPost] = useState({ candidate: [{}] }); //입력값이 여기로 담겨진다.
    const [isUploading, setIsUploading] = useState(false); //업로드중인지 아닌지 판별하는 state
    const fileInput = useRef();

    const addCard = () => {
        //카드 추가하기
        setPost({ ...post, candidate: [...post.candidate, {}] });
    };

    const deleteCard = currentIdx => {
        //카드 삭제하기
        setPost({
            ...post,
            candidate: post.candidate.filter((ele, idx) => currentIdx !== idx),
        });
    };

    const selectFile = currentIdx => {
        if (isUploading) return; //업로드중이 아닐때에만 파일선택하게 한다.
        setIsUploading(true); //업로드 시작
        const file = fileInput.current.files[0];
        setPost({
            ...post,
            candidate: post.candidate.map((ele, idx) =>
                idx === currentIdx ? { ...ele, photo: file } : ele,
            ),
        });
        setIsUploading(false);
    };
    console.log(post);

    return (
        <div className={classes.root}>
            {post &&
                post.candidate.map((ele, idx) => (
                    <Accordion key={idx}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>
                                기호 {idx + 1}번
                            </Typography>
                            <Button
                                className={classes.button}
                                onClick={() => deleteCard(idx)}
                            >
                                삭제
                            </Button>
                        </AccordionSummary>
                        <AccordionDetails>
                            <WriteBox>
                                <Image>
                                    <Freeview
                                        onClick={() =>
                                            fileInput.current.click()
                                        }
                                    >
                                        {/* 후보자의 이미지가 있으면 보여주고, 아니면 default string을 보여준다. */}
                                        {ele.photo ? (
                                            <img
                                                src={ele.photo}
                                                alt={`기호 ${idx + 1}번`}
                                            />
                                        ) : (
                                            <span>
                                                클릭하여 이미지를 추가해 주세요!
                                            </span>
                                        )}
                                    </Freeview>
                                    <Uploader
                                        ref={fileInput}
                                        type="file"
                                        onChange={() => selectFile(idx)}
                                        disabled={isUploading}
                                    />
                                </Image>
                                <Content>
                                    <input placeholder="이름을 작성해주세요!" />
                                    <input placeholder="학과를 작성해주세요!" />
                                    <textarea placeholder="소개를 작성해주세요!" />
                                </Content>
                            </WriteBox>
                        </AccordionDetails>
                    </Accordion>
                ))}

            <Button onClick={addCard}>추가하기</Button>
        </div>
    );
};

const Freeview = styled.div`
    height: 100%;
    width: 300px;
`;
const WriteBox = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;
const Image = styled.div``;

const Uploader = styled.input`
    display: none;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    input,
    textarea {
        width: 100%;
        all: unset;
        border-bottom: 2px solid #707070;
        padding-bottom: 10px;
        margin-bottom: 10px;
    }
`;

export default ElectionWrite;
