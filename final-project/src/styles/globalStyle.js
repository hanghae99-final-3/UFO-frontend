import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
/* font 설정 */
input {
  font-family: 'Noto Sans KR', sans-serif !important;
}
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family: 'Noto Sans KR', sans-serif !important;
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
