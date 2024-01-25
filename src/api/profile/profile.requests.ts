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
	const res = await axios.get("/email-request-verification")
	return res.data
}

export type VerifyEmailResponse = {
	message: string
}

export type VerifyEmailPayload = number

export async function verifyEmail(code: VerifyEmailPayload): Promise<RequestEmailVerificationResponse> {
	const res = await axios.post("/email-verification", {
		code,
	})
	return res.data
}
