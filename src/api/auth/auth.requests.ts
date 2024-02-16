import axios from "~/app/axios"
import { AxiosResponse } from "axios"

export type RefreshResult = AxiosResponse<{
	accessToken: string
}>

export function refresh(): Promise<RefreshResult> {
	return axios.get("/auth/refresh")
}

export function signOut(): Promise<void> {
	localStorage.clear()
	return axios.get("/sign-out")
}
