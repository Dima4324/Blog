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

const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

const UserName = styled.p`
  margin: 0 0 3px 0;
  font-size: 20px;
  font-weight: 500;
`;

const ControlPanelContainer = ({ className }) => {
  const navigate = useNavigate();

  const roleId = useSelector(selectUserRole);
  const login = useSelector(selectUserLogin);
  const session = useSelector(selectUserSession);

  const dispatch = useDispatch();

  const onLogout = () => {
	dispatch(logout(session))
	sessionStorage.removeItem("userData")
  }

  return (
    <div className={className}>
      <ProfleAligned>
        {roleId === ROLE.GUEST ? (
          <StyledLink to="/login">
            <Button>Войти</Button>
          </StyledLink>
        ) : (
          <>
            <UserName>{login}</UserName>
            <Icon id="fa-sign-out" onClick={onLogout} />
          </>
        )}
      </ProfleAligned>
      <RightAligned>
        <Icon id="fa-backward" onClick={() => navigate(-1)} />
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
