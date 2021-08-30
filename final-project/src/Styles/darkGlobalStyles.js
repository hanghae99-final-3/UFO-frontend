import { createGlobalStyle } from "styled-components";
import mixin from "./Mixin";

export const DarkGlobalStyle = createGlobalStyle`

/* 다이나믹 서브셋 */
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css');

/* font 설정 */
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family: 'Pretendard', sans-serif;
  color:#fff;

  &:focus,&:hover,&:active{
  outline:none 
  }
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
}
button {
  border: 0;
  cursor: pointer;
}
body{
    height: 100vh;
    position: relative;
    background: #292b2d;

  /* 스크롤바 제거 */
  &::-webkit-scrollbar {
    display: none;
  }

}

/* CKEditor css설정 */
.ck-content{
    *{
        font-size: ${({ theme }) => theme.fontSize["20"]};
        color:${({ theme }) => theme.color.gray3};
        @media ${({ theme }) => theme.mobile} {
            font-size: ${({ theme }) => theme.fontSize["16"]};
        }
    }
    h1{
        font-size: ${({ theme }) => theme.fontSize["40"]};
        @media ${({ theme }) => theme.mobile} {
            font-size: ${({ theme }) => theme.fontSize["28"]};
        }
    }
    h2{
        font-size: ${({ theme }) => theme.fontSize["30"]};
        @media ${({ theme }) => theme.mobile} {
            font-size: ${({ theme }) => theme.fontSize["22"]};
        }
    }
    a{
        color:${({ theme }) => theme.color.mainBlue};
    } 
}

/* swal css 설정 */
.swal2-popup.swal2-modal.swal2-icon-warning.swal2-show{
  border-radius:50px;
  border: solid 3px;
  border-color: ${({ theme }) => theme.color.mainMint};
.swal2-title{
  color :${({ theme }) => theme.color.black};
  font-size: ${({ theme }) => theme.fontSize["22"]};
}
.swal2-confirm.swal2-styled{
  border-radius: 20px;
  background-color: ${({ theme }) => theme.color.blue1};
  width : 90px;
  /* ${mixin.textProps(11, "semiBold", "white")} */
}
.swal2-cancel.swal2-styled{
  width : 90px;
  border-radius:20px;
  background-color: ${({ theme }) => theme.color.blue1};
}
.swal2-icon.swal2-warning.swal2-icon-show{
  color:${({ theme }) => theme.color.danger};
  border-color: ${({ theme }) => theme.color.danger};
}

}
`;
