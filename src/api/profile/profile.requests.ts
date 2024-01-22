import axios from "~/app/axios"

export type Profile = {
	email: string
	name: string
	id: string
	birthday: string
	createdAt: string
	updatedAt: string
}

export type FetchProfileResponse = Profile

export async function fetchProfile(): Promise<FetchProfileResponse> {
	const res = await axios.get("/profile")
	return res.data
}
