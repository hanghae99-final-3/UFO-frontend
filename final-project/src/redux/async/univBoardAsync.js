import { createAsyncThunk } from "@reduxjs/toolkit";
import {univBoardApi, univCommentApi} from '../../api'

//const axios = () => {}; // template 예제를 위한 임의의 함수, 무시

// createAsyncThunk API로 비동기 액션을 만들면 이 액션에 대해 pending, fulfilled, rejected 상태에 대한 액션이 자동으로 생성된다.


//UnivBoard 목록 불러오기=>슬라이스로 보내고.
export const getUnivBoardDB = createAsyncThunk(
    "univBoard/getUnivList",
    async (data, thunkAPI) => {
        try {
            const response = await univBoardApi.getList();
            console.log('get univ board response',response)
            if(response.data.ok){
                return response.data.result
            }
        } catch(err){
            console.log(err)
        }
    }
);


//UnivBoard List 추가하기
export const addUnivBoardDB = createAsyncThunk(
    "univBoard/addUnivList",
    async (data, thunkAPI) =>{
        try{
            const response = await univBoardApi.addList(data)
            console.log(response)
        }catch (err){
            console.log(err)
        }
    }
);

//UnivBoard 수정하기
export const updateUnivBoardDB = createAsyncThunk(
    "univBoard/updateUnivBoardDB",
    async(data, thunkAPI) =>{
        console.log('data',data)
        try{
        const response = await univBoardApi.updatePost(data)
        console.log('update response',response)
        } catch(err) {
            console.log(err)
        }
    }
)

//UnivBoard 상세보기
export const detailUnivBoardDB = createAsyncThunk(
    'univBoard/post/detail',
    async(data,thunkAPI) =>{
        const response = await univBoardApi.getPost(data)
        console.log('univ detail response',response)
        return response.data.result
    }
)

//UnivComment 불러오기
export const getUnivBoardCommentDB = createAsyncThunk(
    'univBoard/detail/getcomment',
    async(data,thunkAPI) =>{
        const response = await univCommentApi.getUnivComment()
        console.log('get commentDB response = ',response)
        return(response)
    }
)
//UnivComment 추가하기
export const addUnivCommentDB = createAsyncThunk(
    'univBoard/detail/addcomment',
    async(data, thunkAPI) =>{
        console.log('comment data = ',data)
        // const response = await univCommentApi.addUnivComment()
        // console.log(response)
        // return (response)
    }
)




//만들어진 비동기 액션에 대한 리듀서는 Slice의 extraReducer 부분에서 작성할 수 있다.
