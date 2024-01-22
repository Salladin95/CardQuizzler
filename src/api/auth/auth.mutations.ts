import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { signIn, SignInPayload, SignInResult, signUp, SignUpPayload, SignUpResult } from "~/api"
import { AxiosError } from "axios"

export function useSignInMutation(
	options?: Omit<UseMutationOptions<SignInResult, AxiosError, SignInPayload>, "mutationFn">,
) {
	return useMutation({
		mutationFn: signIn,
		...options,
	})
}

export function useSignUpMutation(
	options?: Omit<UseMutationOptions<SignUpResult, AxiosError, SignUpPayload>, "mutationFn">,
) {
	return useMutation({
		mutationFn: signUp,
		...options,
	})
}
