import axios from "~/app/axios"
import { AxiosError } from "axios"
import { useMutation, UseMutationOptions } from "@tanstack/react-query"

export type RequestEmailVerificationPayload = {
	email: string
}

export type RequestEmailVerificationResponse = {
	message: string
}

export async function requestEmailVerification(
	payload: RequestEmailVerificationPayload,
): Promise<RequestEmailVerificationResponse> {
	const res = await axios.post("/request-email-verification", { email: payload.email })
	return res.data
}

export const useRequestEmailVerification = (
	options?: Omit<
		UseMutationOptions<RequestEmailVerificationResponse, AxiosError, RequestEmailVerificationPayload>,
		"mutationFn"
	>,
) => {
	return useMutation({
		mutationFn: requestEmailVerification,
		...options,
	})
}

export type UseRequestEmailVerification = ReturnType<typeof useRequestEmailVerification>
