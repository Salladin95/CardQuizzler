import axios from "~/app/axios"
import { AxiosError } from "axios"
import { Profile } from "~/app/models"
import { useMutation, UseMutationOptions } from "@tanstack/react-query"

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

export const useUpdatePassword = (
	options?: Omit<UseMutationOptions<UpdatePasswordResponse, AxiosError, UpdatePasswordPayload>, "mutationFn">,
) => {
	return useMutation({
		mutationFn: updatePassword,
		...options,
	})
}
