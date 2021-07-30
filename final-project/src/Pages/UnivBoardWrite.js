import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { addUnivBoardDB } from '../redux/async/univBoardAsync'

const UniboardWrite = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const TitleChange = (e) =>{
        setTitle(e.target.value)
    }
    const ContentChange = (e) =>{
        setContent(e.target.value)
    }
    const Input = ()=>{
        const data = {title,content}
        dispatch(addUnivBoardDB(data))
        
    }

    return (
        <React.Fragment>
            <div>
                <input placeholder={'TITLE'} onChange={TitleChange}/>
            </div>
            <div>
                <input placeholder={'CONTENT'} onChange={ContentChange}/>
            </div>
            <button onClick={Input}>입력</button>
        </React.Fragment>
    )
}



export default UniboardWrite
