import React, { forwardRef } from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import theme from "../../Styles/theme";
import categories from "../../Shared/categories";
import { history } from "../../Redux/configureStore";
import DefaultButton from "../../Elements/Buttons/DefaultButton";

const SupportUniv = forwardRef((props, ref) => {
    //forwardRef를 이용하여 부모에게 ref 정보를 넘겨준다.
    const isDarkTheme = props.isDarkTheme;
    //데스크탑 사이즈인지 아닌지에 대한 판별값입니다.
    const isDesktop =
        document.documentElement.clientWidth >= 1080 ? true : false;

    return (
        <Container isDarkTheme={isDarkTheme} ref={ref}>
            <Heading>
                <Title isDarkTheme={isDarkTheme}>지원대학목록</Title>
                <DefaultButton onClick={() => history.push("/univboard")}>
                    대학 게시판 가기
                </DefaultButton>
            </Heading>
            <SupportBox isDesktop={isDesktop}>
                {categories.supportList &&
                    categories.supportList.map((country, idx) => (
                        <CuntryBox isDarkTheme={isDarkTheme} key={idx}>
                            <CuntryTitle isDarkTheme={isDarkTheme}>
                                {country?.countryName}
                            </CuntryTitle>
                            <UnivList isDarkTheme={isDarkTheme}>
                                {country.list.map((ele, idx) => (
                                    <UnivTitle key={idx}>{ele}</UnivTitle>
                                ))}
                            </UnivList>
                        </CuntryBox>
                    ))}
            </SupportBox>
        </Container>
    );
});

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

const SupportBox = styled.ul`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.calRem(16)};
    ${props =>
        props.isDesktop
            ? `grid-template-columns: repeat(2, 1fr);`
            : `grid-template-columns: repeat(1, 1fr);`}
`;
const CuntryBox = styled.div`
    ${mixin.outline("4px solid", "blue2")}
    ${props => (props.isDarkTheme ? mixin.darkBoxShadow() : mixin.boxShadow())};
    border-radius: 25px;
    padding: ${theme.calRem(20)};
`;
const CuntryTitle = styled.span`
    ${props =>
        mixin.textProps(
            30,
            "extraBold",
            props.isDarkTheme ? "white" : "black",
        )};
    display: inline-block;
    padding-bottom: ${theme.calRem(10)};
    @media ${({ theme }) => theme.mobile} {
        ${props =>
            mixin.textProps(
                22,
                "extraBold",
                props.isDarkTheme ? "white" : "black",
            )}
    }
`;
const UnivList = styled.ul``;
const UnivTitle = styled.li`
    ${props =>
        mixin.textProps(
            14,
            "semiBold",
            props.isDarkTheme ? "mainGray" : "gray2",
        )};
    :not(:last-child) {
        margin-bottom: ${theme.calRem(10)};
    }
    @media ${({ theme }) => theme.mobile} {
        ${props =>
            mixin.textProps(
                12,
                "semiBold",
                props.isDarkTheme ? "mainGray" : "gray2",
            )};
    }
`;

export default SupportUniv;
