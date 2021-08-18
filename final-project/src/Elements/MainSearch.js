import React from "react";
import styled from "styled-components";

const MainSearch = props => {
    return (
        <React.Fragment>
            <Form>
                <Input />
            </Form>
        </React.Fragment>
    );
};

export default MainSearch;

const Form = styled.form`
    width: 100%;
`;
const Input = styled.input``;
