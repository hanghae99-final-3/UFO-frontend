import React, { useState } from "react";
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
    const [post, setPost] = useState({ candidate: [{}] });

    const deleteCard = cardIdx => {
        setPost({
            ...post,
            candidate: post.candidate.filter((ele, idx) => cardIdx !== idx),
        });
    };

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
                                    <Freeview>
                                        <img src="" alt="" />
                                    </Freeview>
                                    <input
                                        type="file"
                                        onChange={e =>
                                            console.log(e.target.files[0])
                                        }
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

            <Button
                onClick={() =>
                    setPost({ ...post, candidate: [...post.candidate, {}] })
                }
            >
                추가하기
            </Button>
        </div>
    );
};

const Freeview = styled.div``;
const WriteBox = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;
const Image = styled.div``;
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
