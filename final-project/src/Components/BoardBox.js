import React, {useEffect} from 'react'
import styled from 'styled-components'
import {history} from '../redux/configureStore'
import { useDispatch, useSelector } from 'react-redux'
import { BiHeart } from 'react-icons/bi';
import { MdComment } from 'react-icons/md';
import { BiShareAlt } from 'react-icons/bi';

const BoardBox = () => {

    const _onClick =()=>{
        window.alert('이동!')
    }

    return (
        <React.Fragment>
            <FreeBoardContentBox>
                <Header>
                    <Tag>#태그?</Tag>
                    <More>더보기</More>
                </Header>
                <Content>
                    <Text onClick={_onClick}>
                        <Title>
                            <span>
                                <SmallTag>
                                    #정보
                                </SmallTag>
                            </span>
                            <p>제목을 만들어 봅시다</p>
                        </Title>
                        <Icon>
                            <span><BiHeart style={{fontSize:'20px'}}/>N개</span>
                            <span><MdComment style={{fontSize:'20px'}}/>N개</span>
                            <span><BiShareAlt style={{fontSize:'20px'}}/>N회</span>
                        </Icon>
                    </Text>
                    <Text onClick={_onClick}>
                        <Title>
                            <span>
                                <SmallTag>
                                    #정보
                                </SmallTag>
                            </span>
                            <p>제목을 만들어 봅시다</p>
                        </Title>
                        <Icon>
                            <span><BiHeart style={{fontSize:'20px'}}/>N개</span>
                            <span><MdComment style={{fontSize:'20px'}}/>N개</span>
                            <span><BiShareAlt style={{fontSize:'20px'}}/>N회</span>
                        </Icon>
                    </Text>
                    <Text onClick={_onClick}>
                        <Title>
                            <span>
                                <SmallTag>
                                    #정보
                                </SmallTag>
                            </span>
                            <p>제목을 만들어 봅시다</p>
                        </Title>
                        <IconContainer>
                            <Icon>
                                <BiHeart style={{fontSize:'20px'}}/><span>n개</span>
                            </Icon>
                            <Icon>
                                <MdComment style={{fontSize:'20px'}}/><span>n개</span>
                            </Icon>
                            <Icon>
                                <BiShareAlt style={{fontSize:'20px'}}/><span>n개</span>
                            </Icon>
                        </IconContainer>
                    </Text>
                </Content>
            </FreeBoardContentBox>
        </React.Fragment>
    )
}

const FreeBoardContentBox = styled.div`
    width : 100%;
    padding : 20px 0;
`
const Header = styled.div`
    padding : 0 20px;
    display : flex;
    justify-content : space-between; 
`
const Title = styled.div`
    display : flex;
`
const IconContainer = styled.div`
    display : flex;
    /* .span{
        font-size: 20px;
    } */
`
const Icon = styled.div`
    display : flex;
    align-items : center;
`
const Tag = styled.span`
    padding : 0 1rem 0 1rem;
    border : none;
    border-radius: 5rem;
    background-color : #717171;
    color : white;
    font-size : 1.5rem;
`
const SmallTag = styled.span`
    padding : 0 1rem 0 1rem;
    border : 1px solid #3B3B3B;
    border-radius: 5rem;
    background-color : white;
    color : #505050;
`
const More = styled.div`
    :hover{
        cursor:pointer;
    }
`
const Content = styled.div`
    margin : 20px;
    padding : 10px 0 10px 0;
    background-color: #F9F9F9;
`
const Text = styled.div`
    margin : 15px;
    display : flex;
    /* background-color : pink; */
    :hover{
        cursor:pointer;
        background-color : #E7E7E7;
        border-radius : 5rem;
    }
    span {
        padding-right: 20px;
    }
    justify-content : space-between;
`
const LikeCnt = styled.div`
    margin : 20px;
`



export default BoardBox
