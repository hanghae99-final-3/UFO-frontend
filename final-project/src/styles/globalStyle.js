import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

/* 다이나믹 서브셋 */
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css');

/* font 설정 */
input {
  font-family: 'Pretendard', sans-serif !important;
}
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
     font-family: 'Pretendard', sans-serif !important;
  color:black;
  &:focus,&:hover,&:active{
  outline:none !important;
  }
  outline:none !important;
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
  /* 스크롤바 제거 */
  &::-webkit-scrollbar {
    display: none;
  }
}

`;
