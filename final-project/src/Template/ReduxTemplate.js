import { createSlice } from "@reduxjs/toolkit";

let getTemplates; // 아래 extraReducers 예제를 위한 임의의 변수, 무시

/**
 * @initialState 초기 리덕스 상태값 넣어주기
 * @역할 무엇을 위한 Slice인지 적어주기
 * @필수값 컴포넌트 사용을 위해 어떤 props가 필요한지 명시해주기
 */

const initialState = {};

// reducer이름과 함수가 포함된 초기 상태와 lookup테이블을 받아 액션 생성자 함수, 액션 유형 문자열 및 리듀서 함수를 자동으로 생성한다.
const templateSlice = createSlice({
    name: "template", // 액션 타입 문자열의 prefix로 사용됨
    initialState: initialState, // 초기 state 값
    reducers: {
        addTemplate(state, action) {
            const { id, text } = action.payload;
            state.push({ id, text, completed: false });
        },
    }, // 리듀서 맵. key는 액션 타입 문자열이 되고(ex. template/addTodo), 함수는 액션이 dispatch 될 때 실행되는 reducer

    //extraReducers 외부 작업을 참조(e.g 비동기 처리)
    extraReducers: {
        [getTemplates.fulfilled]: (state, { payload }) => {
            state.movieData = payload.response;
            state.isFetching = false;
            state.errorMessage = null;
        },
        [getTemplates.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [getTemplates.rejected]: (state, { payload }) => {
            state.isFetching = false;
        },
    },
});

// export default templateSlice;
