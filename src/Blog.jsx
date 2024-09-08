import styled from "styled-components";
import { Header, Footer } from "./components";
import { Routes, Route } from "react-router-dom";
import { Authorization, Main, Registration, Users } from "./pages";
import { Post } from "./pages";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./store/actions";
import { Modal } from "./components";

const AppColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 1000px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
  position: relative;
`;

const Page = styled.div`
  padding: 120px 0 20px;
`;

export const Blog = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem("userData");

    if (!currentUserDataJSON) {
      return;
    }

    const currentUserData = JSON.parse(currentUserDataJSON);

    dispatch(
      setUser({
        ...currentUserData,
        roleId: Number(currentUserData.roleId),
      })
    );
  }, [dispatch]);

  return (
    <AppColumn>
      <Header />
      <Page>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Authorization />}></Route>
          <Route path="/register" element={<Registration />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/post" element={<Post />}></Route>
          <Route path="/post/:id" element={<Post />}></Route>
          <Route path="/post/:id/edit" element={<Post />}></Route>
          <Route path="*" element={<div>Ошибка</div>}></Route>
        </Routes>
      </Page>
      <Footer />
      <Modal />
    </AppColumn>
  );
};
