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

export type UpdateEmailPayload = {
	code: number
	email: string
	id: string
}
export type UpdateEmailResponse = Profile

export async function updateEmail(payload: UpdateEmailPayload): Promise<UpdateEmailResponse> {
	const res = await axios.patch(`/user/update-email/${payload.id}`, {
		code: payload.code,
		email: payload.email,
	})
	return res.data
}

export type UpdatePasswordPayload = {
	currentPassword: string
	newPassword: string
	id: string
}
export type UpdatePasswordResponse = Profile

export async function updatePassword(payload: UpdatePasswordPayload): Promise<UpdatePasswordResponse> {
	const res = await axios.patch(`/user/update-password/${payload.id}`, {
		currentPassword: payload.currentPassword,
		newPassword: payload.newPassword,
	})
	return res.data
}

export type ResetPasswordPayload = {
	code: number
	newPassword: string
	email: string
}
export type ResetPasswordResponse = Profile

export async function resetPassword(payload: ResetPasswordPayload): Promise<ResetPasswordResponse> {
	const res = await axios.patch("/user/reset-password", {
		code: payload.code,
		email: payload.email,
		newPassword: payload.newPassword,
	})
	return res.data
}
