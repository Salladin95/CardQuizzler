import { AxiosResponse } from "axios"
import axios from "~/app/axios"

export type Profile = {
	email: string
	name: string
	id: string
	birthday: string
	createdAt: string
	updatedAt: string
}

export type FetchProfileResponse = AxiosResponse<Profile>

export function fetchProfile(): Promise<FetchProfileResponse> {
	// TODO: REPLACE MOCK LOGIC
	return axios.get("/profile")
}
