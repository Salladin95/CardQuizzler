import axios from "~/app/axios"
import { Profile } from "~/api"
import { AxiosError, AxiosResponse } from "axios"
import { useMutation, UseMutationOptions } from "@tanstack/react-query"

export type SignUpPayload = {
	birthday: string
}

export type SignUpResult = AxiosResponse<{
	message: string
	data: Profile
}>

export function signUp(payload: SignUpPayload): Promise<SignUpResult> {
	return axios.post("/auth/sign-up", payload)
}

export function useSignUpMutation(
	options?: Omit<UseMutationOptions<SignUpResult, AxiosError<{ message: string }>, SignUpPayload>, "mutationFn">,
) {
	return useMutation({
		mutationFn: signUp,
		...options,
	})
}
