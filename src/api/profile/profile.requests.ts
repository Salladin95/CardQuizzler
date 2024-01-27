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

export async function getProfile(): Promise<FetchProfileResponse> {
	const res = await axios.get("/profile")
	return res.data
}

export type RequestEmailVerificationResponse = {
	message: string
}

export async function requestEmailVerification(): Promise<RequestEmailVerificationResponse> {
	const res = await axios.get("/request-email-verification")
	return res.data
}

export type UpdateEmailResponse = Profile

export type UpdateEmailPayload = {
	code: number
	email: string
}

export async function updateEmail(payload: UpdateEmailPayload): Promise<UpdateEmailResponse> {
	const res = await axios.patch("/user/update-email", {
		code: payload.code,
		email: payload.email,
	})
	return res.data
}

// update-password
// reset-password
