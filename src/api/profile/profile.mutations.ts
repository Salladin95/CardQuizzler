import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import {
	resetPassword,
	ResetPasswordPayload,
	ResetPasswordResponse,
	updateEmail,
	UpdateEmailPayload,
	UpdateEmailResponse,
	updatePassword,
	UpdatePasswordPayload,
	UpdatePasswordResponse,
} from "~/api"
import { AxiosError } from "axios"

export const useUpdateEmail = (
	options?: Omit<UseMutationOptions<UpdateEmailResponse, AxiosError, UpdateEmailPayload>, "mutationFn">,
) => {
	return useMutation({
		mutationFn: updateEmail,
		...options,
	})
}

export const useUpdatePassword = (
	options?: Omit<UseMutationOptions<UpdatePasswordResponse, AxiosError, UpdatePasswordPayload>, "mutationFn">,
) => {
	return useMutation({
		mutationFn: updatePassword,
		...options,
	})
}

export const useResetPassword = (
	options?: Omit<UseMutationOptions<ResetPasswordResponse, AxiosError, ResetPasswordPayload>, "mutationFn">,
) => {
	return useMutation({
		mutationFn: resetPassword,
		...options,
	})
}
