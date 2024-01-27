import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { signIn, SignInPayload, SignInResult, signUp, SignUpPayload, SignUpResult } from "~/api"
import { AxiosError } from "axios"
import useApiErrorToast from "~/shared/hooks/useApiErrorToast"

export function useSignInMutation(
	options?: Omit<UseMutationOptions<SignInResult, AxiosError, SignInPayload>, "mutationFn">,
) {
	const toast = useApiErrorToast()
	return useMutation({
		mutationFn: signIn,
		onError: toast,
		...options,
	})
}

export function useSignUpMutation(
	options?: Omit<UseMutationOptions<SignUpResult, AxiosError, SignUpPayload>, "mutationFn">,
) {
	const toast = useApiErrorToast()
	return useMutation({
		mutationFn: signUp,
		onError: toast,
		...options,
	})
}
