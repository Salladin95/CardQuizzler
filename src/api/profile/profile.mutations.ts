import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { updateEmail, UpdateEmailPayload, UpdateEmailResponse } from "~/api"
import { AxiosError } from "axios"

export const useUpdateEmail = (
	options?: Omit<UseMutationOptions<UpdateEmailResponse, AxiosError, UpdateEmailPayload>, "mutationFn">,
) => {
	return useMutation({
		mutationFn: updateEmail,
		...options,
	})
}
