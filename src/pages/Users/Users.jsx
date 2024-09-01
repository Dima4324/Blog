import styled from "styled-components";
import { Content, H2 } from "../../components";
import { TableRow, UserRow } from "./components";
import { useServerRequest } from "../../hooks";
import { useEffect, useState } from "react";
import { ROLE } from "../../constants";

const UsersContainer = ({ className }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
//   const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

  const serverRequest = useServerRequest();

  useEffect(() => {
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
  }, [serverRequest]);

  const onUserRemove = (userId) => {
    serverRequest("removeUser", userId).then(() => {
      setUsers(users.filter((user) => user.id !== userId));
    });
  };

  return (
    <div className={className}>
      <Content error={errorMessage}>
        <H2>Пользователи</H2>
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
                roles={roles.filter(({ id: roleId }) => roleId !== ROLE.GUEST)}
                onUserRemove={() => onUserRemove(id)}
              />
            ))}
          </tbody>
        </table>
      </Content>
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
