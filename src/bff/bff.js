import { getUser } from "./get-user";
import { createUser } from "./create-user";
import { createSession } from "./create-session";

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
			res: createSession(user.role_id)
		}
	},
	async register(regLogin, regPassword) {
		const user = await getUser(regLogin);

		if (user) {
			return {
				error: "Данный логин уже занят",
				res: null,
			};
		};

		await createUser(regLogin, regPassword)

		return {
			error: null,
			res: createSession(user.role_id)
		}
	}
}