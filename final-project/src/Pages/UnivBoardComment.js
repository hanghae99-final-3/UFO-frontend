import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { addUnivCommentDB, getUnivBoardCommentDB } from '../redux/async/univBoardAsync'

const UnivBoardComment = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getUnivBoardCommentDB())
    })
    const [comment, setComment] = useState()
    const submit = (e)=>{
        setComment(e.target.value)
    }
    const _onClick = ()=>{
        dispatch(addUnivCommentDB(comment))
    }

    return (
        <React.Fragment>
            <hr/>
            <input placeholder={'댓글을 적어주세요'}/>
            <button onChange={submit} onClick={_onClick}>댓글입력하기</button>
            <p>댓글</p>
        </React.Fragment>
    ) 
}

export default UnivBoardComment
