import axios from "~/app/axios"
import { AxiosError, AxiosResponse } from "axios"
import { useMutation, UseMutationOptions } from "@tanstack/react-query"

export type SignInPayload = {
	email: string
	password: string
}
export type SignInResult = AxiosResponse<{
	accessToken: string
}>

export function signIn(payload: SignInPayload): Promise<SignInResult> {
	return axios.post("/auth/sign-in", payload)
}

export function useSignInMutation(
	options?: Omit<UseMutationOptions<SignInResult, AxiosError, SignInPayload>, "mutationFn">,
) {
	return useMutation({
		mutationFn: signIn,
		...options,
	})
}
