import PropTypes from "prop-types";
import styled from "styled-components";
import { Icon } from "../../../../components";
import { TableRow } from "../TableRow/TableRow";
import { useState } from "react";
import { useServerRequest } from "../../../../hooks";
import { PROP_TYPE } from "../../../../constants";

const UserRowContainer = ({
  className,
  id,
  login,
  registeredAt,
  roleId: userRoleId,
  roles,
  onUserRemove,
}) => {
  const [initialRoleId, setInitialRoleId] = useState(userRoleId);
  const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);

  const serverRequest = useServerRequest();

  const onRoleChange = ({ target }) => {
    setSelectedRoleId(+target.value);
  };

  const onRoleSave = (userId, newUserRoleId) => {
    serverRequest("updateUserRole", userId, newUserRoleId).then(() => {
      setInitialRoleId(newUserRoleId);
    });
  };

  const isSaveButtonDisabled = selectedRoleId === initialRoleId;
  return (
    <TableRow className={className}>
      <td className="login-column">{login}</td>
      <td className="registered-at-column">{registeredAt}</td>
      <td className="role-column">
        <select
          value={selectedRoleId}
          onChange={onRoleChange}
          className="select-role"
        >
          {roles.map(({ id: roleId, name: roleName }) => (
            <option value={roleId} key={roleId}>
              {roleName}
            </option>
          ))}
        </select>
        <Icon
          id="fa-floppy-o"
          disabled={isSaveButtonDisabled}
          onClick={() => onRoleSave(id, selectedRoleId)}
        />
      </td>
      <td className="td-icon" onClick={onUserRemove}>
        <Icon id="fa-trash-o" margin="0 0 0 20px" />
      </td>
    </TableRow>
  );
};

export const UserRow = styled(UserRowContainer)`
  padding: 6px 10px;
  border: 2px solid #000;
  font-size: 16px;

  & .td-icon {
    margin-right: -40px;
  }

  & .select-role {
    border: 2px solid #000;
    font-size: 16px;
    padding: 4px;
  }
`;

UserRow.propTypes = {
  id: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  registeredAt: PropTypes.string.isRequired,
  roleId: PROP_TYPE.ROLE_ID.isRequired,
  roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
  onUserRemove: PropTypes.func.isRequired,
};
