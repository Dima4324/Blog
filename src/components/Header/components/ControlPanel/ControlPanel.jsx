import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Icon, Button } from "../../../../components";
import { ROLE } from "../../../../constants";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserRole,
  selectUserLogin,
  selectUserSession,
} from "../../../../store/selectors";
import { logout } from "../../../../store/actions/logout";

const RightAligned = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
`;

const ProfleAligned = styled.div`
  height: 32px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

const StyledIcon = styled.button`
  border: none;
  background-color: inherit;
  &:hover {
    cursor: pointer;
  }
`;

const UserName = styled.p`
	margin: 0 0 3px 0;
	font-size: 20px;
	font-weight: 500;
`

const ControlPanelContainer = ({ className }) => {
  const navigate = useNavigate();

  const roleId = useSelector(selectUserRole);
  const login = useSelector(selectUserLogin);
  const session = useSelector(selectUserSession);

  const dispatch = useDispatch();

  return (
    <div className={className}>
      <ProfleAligned>
        {roleId === ROLE.GUEST ? (
          <Button>
            <Link to="/login">Войти</Link>
          </Button>
        ) : (
          <>
            <UserName>{login}</UserName>
            <StyledIcon onClick={() => dispatch(logout(session))}>
              <Icon id="fa-sign-out" />
            </StyledIcon>
          </>
        )}
      </ProfleAligned>
      <RightAligned>
        <StyledIcon onClick={() => navigate(-1)}>
          <Icon id="fa-backward" />
        </StyledIcon>
        <Link to="/post">
          <Icon id="fa-file-text-o" />
        </Link>
        <Link to="/users">
          <Icon id="fa-users" />
        </Link>
      </RightAligned>
    </div>
  );
};

export const ControlPanel = styled(ControlPanelContainer)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
