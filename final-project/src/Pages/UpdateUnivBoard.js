import React, {useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { updateUnivBoardDB } from '../redux/async/univBoardAsync'
import { history } from '../redux/configureStore'

const UpdateUnivBoard = (props) => {
    const post = useSelector(state => state.univBoard.postDetail)
    const dispatch = useDispatch()
    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.content)
    const ChangeTitle = (e)=>{
        setTitle(e.target.value)
    }
    const submit =()=>{
        const update = {
            user_id: 1,
            post_id : 1,
            univ_id: 3,
            title: title,
            category: 1,
            content: content,
            is_fixed: false
        }
        // console.log('post=',post)
        console.log('update',update)
        dispatch(updateUnivBoardDB(update))
    }
    
    
    return (
        <React.Fragment>
            <div>
                제목<input value={title} onChange={ChangeTitle}/>
            </div>
            <div>
                내용<input value={content} onChange={(e) => {
                    setContent(e.target.value)
                }}/>
            </div>
            <button onClick={submit}>수정완료</button>
        </React.Fragment>
    )
}

export default UpdateUnivBoard
