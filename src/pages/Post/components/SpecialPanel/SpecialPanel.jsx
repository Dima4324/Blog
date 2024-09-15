import PropTypes from "prop-types";
import styled from "styled-components";
import { Icon } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { useServerRequest } from "../../../../hooks";
import {
  CLOSE_MODAL,
  openModal,
  removePostAsync,
} from "../../../../store/actions";
import { useNavigate } from "react-router-dom";
import { checkAccess } from "../../../../utils/check-access";
import { ROLE } from "../../../../constants";
import { selectUserRole } from "../../../../store/selectors";

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
  const dispatch = useDispatch();
  const serverRequest = useServerRequest();
  const navigate = useNavigate();

  const roleId = useSelector(selectUserRole);

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

  const isAdmin = checkAccess([ROLE.ADMIN], roleId);

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
      {isAdmin && (
        <div className="buttons">
          {editButton}
          {publishedAt && (
            <>
              <Icon id="fa-trash-o" onClick={onPostRemove} />
            </>
          )}
        </div>
      )}
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

SpecialPanel.propTypes = {
  id: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  editButton: PropTypes.node.isRequired,
};
