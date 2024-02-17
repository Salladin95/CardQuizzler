import axios from "~/app/axios"

export function signOut(): Promise<void> {
	localStorage.clear()
	return axios.get("/sign-out")
}
