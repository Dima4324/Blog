import styled from "styled-components";
import { Header } from "./components";
import { Routes, Route } from "react-router-dom";

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100%;
	margin: 0 auto;
	background-color: #fff;
`

const Content = styled.div`
  padding: 120px 0;
`;

const H2 = styled.h2`
	text-aling: center;
`


const Footer = () => <div>Футер</div>;



export const Blog = () => {
  return (
    <AppColumn>
      <Header />
      <Content>
        <H2>Контент страницы</H2>
        <Routes>
          <Route path="/" element={<div>Главная</div>}></Route>
          <Route path="/login" element={<div>Авторизация</div>}></Route>
          <Route path="/register" element={<div>Регистрации</div>}></Route>
          <Route path="/users" element={<div>Пользователи</div>}></Route>
          <Route path="/post" element={<div>Новая статья</div>}></Route>
          <Route path="/post/:postId" element={<div>Статья</div>}></Route>
          <Route path="*" element={<div>Ошибка</div>}></Route>
        </Routes>
      </Content>
      <Footer />
    </AppColumn>
  );
};



// 6:53
// 6:53
// 6:53
// 6:53