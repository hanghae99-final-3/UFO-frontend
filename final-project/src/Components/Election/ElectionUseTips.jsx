import React, { forwardRef } from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";

//사용팁에 대한 imgSrc입니다.
const useTipsImage = [
    require("../../Assets/UseTips/Election/election_usetips1.png").default,
    require("../../Assets/UseTips/Election/election_usetips2.png").default,
    require("../../Assets/UseTips/Election/election_usetips3.png").default,
    require("../../Assets/UseTips/Election/election_usetips4.png").default,
];

const ElectionUseTips = props => {
    const isDarkTheme = props.isDarkTheme; //다크모드인지 아닌지에 대한 판별값입니다.
    //데스크탑 사이즈인지 아닌지에 대한 판별값입니다.
    const isDesktop =
        document.documentElement.clientWidth >= 1080 ? true : false;
    return (
        <Container isDarkTheme={isDarkTheme}>
            <Heading>
                <Title isDarkTheme={isDarkTheme}>선거 사용팁</Title>
            </Heading>
            <GridContainer isDesktop={isDesktop}>
                {useTipsImage.map((imgSrc, idx) => (
                    <UseTipsImage
                        key={idx}
                        src={imgSrc}
                        alt={`선거사용팁${idx + 1}`}
                    />
                ))}
            </GridContainer>
        </Container>
    );
};

const Container = styled.div``;

const Heading = styled.div`
    margin-top: ${({ theme }) => theme.calRem(10)};
    margin-bottom: ${({ theme }) => theme.calRem(10)};
    padding-bottom: ${({ theme }) => theme.calRem(8)};
    ${props =>
        mixin.outline(
            "1.5px solid",
            props.isDarkTheme ? "gray1" : "gray4",
            "bottom",
        )}
    ${mixin.flexBox("space-between", "flex-end", null, null)}
`;

const Title = styled.span`
    ${props =>
        mixin.textProps(
            30,
            "extraBold",
            props.isDarkTheme ? "white" : "black",
        )};
    @media ${({ theme }) => theme.mobile} {
        ${props =>
            mixin.textProps(
                22,
                "extraBold",
                props.isDarkTheme ? "white" : "black",
            )}
    }
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    gap: ${({ theme }) => theme.calRem(16)};
`;

const UseTipsImage = styled.img`
    width: 100%;
    height: 100%;
`;

export default ElectionUseTips;
