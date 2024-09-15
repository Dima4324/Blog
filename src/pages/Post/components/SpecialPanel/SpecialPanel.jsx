import styled from "styled-components";
import { Icon } from "../../../../components";

const SpecialPanelContainer = ({ className, publishedAt, editButton }) => {
  return (
    <div className={className}>
      <div className="published-at">
        <Icon id="fa-calendar-o" />
        <p>{publishedAt}</p>
      </div>
      <div className="buttons">
        {editButton}
        <Icon id="fa-trash-o" />
      </div>
    </div>
  );
};

export const SpecialPanel = styled(SpecialPanelContainer)`
  display: flex;
  justify-content: space-between;
  margin: ${({ margin }) => margin};

  & .published-at {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
  }

  & .published-at > p {
    margin: 0;
  }

  & .buttons {
    display: flex;
    gap: 10px;
  }

  & .published-at > button,
  .buttons > button {
    font-size: 18px;
  }
`;
