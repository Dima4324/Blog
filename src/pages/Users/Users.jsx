import styled from "styled-components";
import { PrivateContent, H2 } from "../../components";
import { TableRow, UserRow } from "./components";
import { useServerRequest } from "../../hooks";
import { useEffect, useState } from "react";
import { ROLE } from "../../constants";
import { checkAccess } from "../../utils/check-access";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../store/selectors";

const UsersContainer = ({ className }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
  const userRole = useSelector(selectUserRole);

  const serverRequest = useServerRequest();


  useEffect(() => {
	if (!checkAccess([ROLE.ADMIN], userRole)) {
		return;
	}

    Promise.all([
      serverRequest("fetchUsers"),
      serverRequest("fetchRoles"),
    ]).then(([usersRes, rolesRes]) => {
      if (usersRes.error || rolesRes.error) {
        setErrorMessage(usersRes.error || rolesRes.error);
        return;
      }

      setUsers(usersRes.res);
      setRoles(rolesRes.res);
    });
  }, [serverRequest, shouldUpdateUserList, userRole]);

  const onUserRemove = (userId) => {
	if (!checkAccess([ROLE.ADMIN], userRole)) {
		return;
	}

    serverRequest("removeUser", userId).then(() => {
      setShouldUpdateUserList(!shouldUpdateUserList);
    });
  };

  return (
    <div className={className}>
      <PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
        <H2 margin="100px 0 0 0">Пользователи</H2>
        <table>
          <thead className="table-header">
            <TableRow>
              <th className="login-column">Логин</th>
              <th className="registered-at-column">Дата регистрации</th>
              <th className="role-column">Роль</th>
            </TableRow>
          </thead>
          <tbody>
            {users.map(({ id, login, registeredAt, roleId }) => (
              <UserRow
                key={id}
                id={id}
                login={login}
                registeredAt={registeredAt}
                roleId={roleId}
                roles={roles.filter(({ id: roleId }) => +roleId !== ROLE.GUEST)}
                onUserRemove={() => onUserRemove(id)}
              />
            ))}
          </tbody>
        </table>
      </PrivateContent>
    </div>
  );
};

export const Users = styled(UsersContainer)`
  width: 570px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & tbody {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
