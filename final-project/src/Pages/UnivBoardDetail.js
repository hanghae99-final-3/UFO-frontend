import React, {useState, useEffect} from 'react'
import { detailUnivBoardDB, updateUnivBoardDB } from '../redux/async/univBoardAsync'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../redux/configureStore'
import UnivBoardComment from './UnivBoardComment'



const UnivBoardDetail = (props) => {
    const dispatch = useDispatch()
    const [isFetching, setIsFetching] = useState(false)

    const postId = props.match.params.id
    useEffect(() => {
        setIsFetching(true)
        dispatch(detailUnivBoardDB(postId))
        setIsFetching(false)
    }, [])
    const post = useSelector((state)=>state.univBoard.postDetail)

    return (
        <React.Fragment>
            <div>
                <span>title :{post.title}/</span>
                <span>content :{post.content}/</span>
                <span>nickname :{post&&post.user&&post.user.nickname}</span>
            </div>
            <div>
                <button onClick={() => {
                    history.push(`/updateuniv/${postId}`)
                }}>수정하기</button>
            </div>
            <UnivBoardComment/>
        </React.Fragment>
    )
}

export default UnivBoardDetail
