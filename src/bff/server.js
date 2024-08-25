import { getUser } from "./get-user";
import { createUser } from "./create-user";
import { sessions } from "./sessions";

export const server = {
	async authorize(authLogin, authPassword) {
		const user = await getUser(authLogin);

		if (!user || authPassword !== user.password) {
			return {
				error: "Неправильный логин или пароль",
				res: null,
			};
		}

		return {
			error: null,
			res: {
				id: user.id,
				login: user.login,
				roleId: user.role_id,
				session: sessions.create(user),
			},
		}
	},
	async register(regLogin, regPassword) {
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
	},
	async logout(session) {
		sessions.remove(session);
	}
}