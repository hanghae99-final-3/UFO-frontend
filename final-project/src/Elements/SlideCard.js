import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import categories from "../categories";
import TimeCounting from "time-counting";
import moment from "moment";
import styled from "styled-components";
import { BiHeart } from "react-icons/bi";
import { MdComment } from "react-icons/md";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { history } from "../redux/configureStore";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        position: "relative",
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
        fontSize: 12,
    },
});
const Icon = styled.div`
    display: flex;
    align-items: center;
    span {
        line-height: 1;
    }
    svg {
        font-size: 20px;
        margin: 0 5px 0 10px;
    }
`;

const IconContainer = styled.div`
    display: flex;
    margin-left: auto;
    margin-right: 10px;
`;

export default function SlideCard({ post, rank }) {
    const classes = useStyles();

    const timeOption = {
        lang: "ko",
        // objectTime: "2020-08-10 06:00:00",
        objectTime: moment().format(`YYYY-MM-DD HH:mm:ss`),
        calculate: {
            justNow: 61,
        },
    };

    return (
        <Card className={classes.root}>
            <span style={{ position: "absolute", top: "3%", left: "90%" }}>
                {rank}위
            </span>
            <CardContent>
                <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                >
                    # {categories.freeBoardTags[post.category]}
                </Typography>
                <Typography variant="h5" component="h2">
                    {post.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {TimeCounting(post.createdAt, timeOption)}
                </Typography>
                <Typography
                    variant="body2"
                    component="p"
                    className="ck-content"
                    dangerouslySetInnerHTML={{
                        __html: post.content,
                    }}
                ></Typography>
            </CardContent>
            <div style={{ display: "flex" }}>
                <CardActions>
                    <Button
                        onClick={() =>
                            history.push(`/freeboard/detail/${post.post_id}`)
                        }
                        size="small"
                    >
                        자세히 보기
                    </Button>
                </CardActions>
                <IconContainer>
                    <Icon>
                        <VisibilityIcon />
                        <span>{post.view_count}</span>
                    </Icon>
                </IconContainer>
            </div>
        </Card>
    );
}
