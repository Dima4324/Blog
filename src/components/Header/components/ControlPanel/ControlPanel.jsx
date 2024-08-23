import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "../../../../components";

const RightAligned = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  width: 100px;
  height: 32px;
  border: 1px solid #000;
  background-color: #eee;
`;

const StyledButton = styled.button`
	border: none;
	background-color: inherit;
	&:hover {
		cursor: pointer;
	}
`

const ControlPanelContainer = ({ className }) => {
  const navigate = useNavigate();

  return (
    <div className={className}>
      <RightAligned>
        <StyledLink to="/login">Войти</StyledLink>
      </RightAligned>
      <RightAligned>
        <StyledButton onClick={() => navigate(-1)}>
          <Icon id="fa-backward" />
        </StyledButton>
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
