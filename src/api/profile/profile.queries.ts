import React from "react"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import {
	FetchProfileResponse,
	getProfile,
	requestEmailVerification,
	RequestEmailVerificationResponse,
	updateEmail,
	UpdateEmailPayload,
	UpdateEmailResponse,
} from "~/api"
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query"

export const profileQueryKey = "profile-query-key"
export const requestResetEmailQueryKey = "request-reset-email"

export const useProfile = (
	options?: Omit<UseQueryOptions<FetchProfileResponse, AxiosError>, "queryFn" | "queryKey">,
) => {
	return useQuery({
		queryKey: [profileQueryKey],
		queryFn: getProfile,
		...options,
	})
}

export const useProtectedProfile = (options?: Parameters<typeof useProfile>[0]) => {
	const router = useRouter()
	const { error, isPending, ...rest } = useProfile(options)
	React.useEffect(() => {
		if (error && !isPending) {
			router.push("/auth")
		}
	}, [error, isPending, router])
	return { ...rest, error, isPending }
}

export const useRequestEmailVerification = (
	options?: Omit<UseQueryOptions<RequestEmailVerificationResponse, AxiosError>, "queryFn" | "queryKey">,
) => {
	return useQuery({
		queryKey: [requestResetEmailQueryKey],
		queryFn: requestEmailVerification,
		...options,
	})
}
