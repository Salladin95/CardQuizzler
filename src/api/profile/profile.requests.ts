import axios from "~/app/axios"
import { JsonResponse } from "~/api"

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
	const res = await axios.get<JsonResponse<Profile>>("/user/profile")
	return res.data.data
}

export type RequestEmailVerificationPayload = {
	email: string
}

export type RequestEmailVerificationResponse = {
	message: string
}

export async function requestEmailVerification(
	payload: RequestEmailVerificationPayload,
): Promise<RequestEmailVerificationResponse> {
	const res = await axios.post("/request-email-verification", { email: payload.email })
	return res.data
}

export type UpdateEmailResponse = Profile

export type UpdateEmailPayload = {
	code: number
	email: string
	id: string
}

export async function updateEmail(payload: UpdateEmailPayload): Promise<UpdateEmailResponse> {
	const res = await axios.patch(`/user/update-email/${payload.id}`, {
		code: payload.code,
		email: payload.email,
	})
	return res.data
}
