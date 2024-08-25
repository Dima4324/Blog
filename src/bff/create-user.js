import { currentDate } from "./current-date"

export const createUser = (login, password) =>
	fetch("http://localhost:3000/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8"
		},
		body: JSON.stringify({
			login,
			password,
			registered_at: currentDate,
			role_id: 2,
		}),
	}).then(createdUser => createdUser.json())