import { createUser, getUser } from "../api";
import { sessions } from "../sessions";

export const register = async (regLogin, regPassword) => {
	const existedUser = await getUser(regLogin);

	console.log(existedUser)

	if (existedUser) {
		return {
			error: "Данный логин уже занят",
			res: null,
		};
	};

	const user = await createUser(regLogin, regPassword)

	return {
		error: null,
		res: {
			id: user.id,
			login: user.login,
			roleId: user.role_id,
			session: sessions.create(user),
		},
	}
}