import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import useApiErrorToast from "~/shared/hooks/useApiErrorToast"
import { signIn, SignInPayload, SignInResult } from "~/api"
import { AxiosError } from "axios"

export function useSignInMutation(
	options?: Omit<UseMutationOptions<SignInResult, AxiosError, SignInPayload>, "mutationFn">,
) {
	const apiErrorToast = useApiErrorToast()
	return useMutation({
		mutationFn: signIn,
		onError: apiErrorToast,
		...options,
	})
}
