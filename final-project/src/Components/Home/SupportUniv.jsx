import React from "react";
import styled from "styled-components";
import mixin from "../../Styles/Mixin";
import theme from "../../Styles/theme";
import categories from "../../Shared/categories";

const SupportUniv = () => {
    return (
        <Container>
            <Title>지원대학목록</Title>
            <SupportBox>
                {categories.supportList.map((country, idx) => (
                    <CuntryBox key={idx}>
                        <CuntryTitle>{country.countryName}</CuntryTitle>
                        <UnivList>
                            {country.list.map((univTitle, idx) => (
                                <UnivTitle id={idx}>{univTitle}</UnivTitle>
                            ))}
                        </UnivList>
                    </CuntryBox>
                ))}
            </SupportBox>
        </Container>
    );
};

const Container = styled.div``;
const Title = styled.span;
const SupportBox = styled.ul``;
const CuntryBox = styled.div``;
const CuntryTitle = styled.span``;
const UnivList = styled.ul``;
const UnivTitle = styled.li``;

export default SupportUniv;
