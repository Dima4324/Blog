import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

const Content = styled.div`
  padding: 120px 0;
`;

const H2 = styled.h2`
	text-aling: center;
`

const Header = () => <div>Шапка</div>;

const Footer = () => <div>Футер</div>;

export const Blog = () => {
  return (
    <>
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
    </>
  );
};
