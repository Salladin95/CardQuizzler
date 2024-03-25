import axios from "~/app/axios"
import { AxiosError } from "axios"
import { Profile } from "~/app/models"
import { useMutation, UseMutationOptions } from "@tanstack/react-query"

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

export const useResetPassword = (
	options?: Omit<UseMutationOptions<ResetPasswordResponse, AxiosError, ResetPasswordPayload>, "mutationFn">,
) => {
	return useMutation({
		mutationFn: resetPassword,
		...options,
	})
}
