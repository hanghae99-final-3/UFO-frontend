import React, {useState, useEffect} from 'react'
import { detailUnivBoardDB } from '../redux/async/univBoardAsync'
import { useDispatch, useSelector } from 'react-redux'



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
                <span>title :{post.title}/</span>
                <span>content :{post.content}/</span>
                <span>nickname :{post&&post.user&&post.user.nickname}</span>
        </React.Fragment>
    )
}

export default UnivBoardDetail
