import styled from "styled-components";
import { H2 } from "../h2/H2";
import { PROP_TYPE } from "../../constants";

const Div = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Error = ({ error }) => {
  return (
    error && (
      <Div>
        <H2>Ошибка</H2>
        <p>{error}</p>
      </Div>
    )
  );
};

Error.propTypes = {
	error: PROP_TYPE.ERROR,
}