import axios from "~/app/axios"
import { AxiosError } from "axios"
import { Profile } from "~/app/models"
import { useMutation, UseMutationOptions } from "@tanstack/react-query"

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

export const useUpdateEmail = (
	options?: Omit<UseMutationOptions<UpdateEmailResponse, AxiosError, UpdateEmailPayload>, "mutationFn">,
) => {
	return useMutation({
		mutationFn: updateEmail,
		...options,
	})
}
