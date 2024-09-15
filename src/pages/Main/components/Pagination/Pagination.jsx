import styled from "styled-components";
import { Button } from "../../../../components";

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
  return (
    <div className={className}>
      <Button disabled={page === 1} onClick={() => setPage(1)}>
        В начало
      </Button>
      {Array.from({ length: lastPage }).map((undefined, i) => (
        <Button
          key={i}
          disabled={page === i + 1}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </Button>
      ))}
      <Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
        В конец
      </Button>
    </div>
  );
};

export const Pagination = styled(PaginationContainer)`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 10px 0;
  padding: 0 20px;
  position: absolute;
  bottom: 140px;
  width: 100%;

  & .button {
    margin: 0 10px;
  }

  & .current-page {
    width: 100%;
    border: 1px solid #000;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
