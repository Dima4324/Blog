import styled from "styled-components";
import { Icon } from "../../../../components";
import { useDispatch } from "react-redux";
import { useServerRequest } from "../../../../hooks";
import {
  CLOSE_MODAL,
  openModal,
  removePostAsync,
} from "../../../../store/actions";
import { useNavigate } from "react-router-dom";

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
  const dispatch = useDispatch();
  const serverRequest = useServerRequest();
  const navigate = useNavigate();

  const onPostRemove = () => {
    dispatch(
      openModal({
        text: "Удалить статью?",
        onConfirm: () => {
          dispatch(removePostAsync(serverRequest, id)).then(() => {
            navigate("/");
          });
          dispatch(CLOSE_MODAL);
        },
        onCancel: () => dispatch(CLOSE_MODAL),
      })
    );
  };

  return (
    <div className={className}>
      <div className="published-at">
        {publishedAt && (
          <>
            <Icon id="fa-calendar-o" inactive="true" />
            <p>{publishedAt}</p>
          </>
        )}
      </div>
      <div className="buttons">
        {editButton}
        {publishedAt && (
          <>
            <Icon id="fa-trash-o" onClick={onPostRemove} />
          </>
        )}
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
