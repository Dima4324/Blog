import styled from "styled-components";
import { H2 } from "../h2/H2";

const Div = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

export const Content = ({ children, error }) => {
  return error ? (
    <Div>
      <H2>Ошибка</H2>
      <p>{error}</p>
    </Div>
  ) : (
    children
  );
};
