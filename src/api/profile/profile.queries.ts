import React from "react"
import { AxiosError } from "axios"
import { useLocalStorage } from "react-use"
import { useRouter } from "next/navigation"
import {
	FetchProfileResponse,
	getProfile,
	requestEmailVerification,
	RequestEmailVerificationPayload,
	RequestEmailVerificationResponse,
} from "~/api"
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query"

export const profileQueryKey = "profile-query-key"

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
	const [accessToken] = useLocalStorage<string | null>("access-token", null)
	const { error, isPending, ...rest } = useProfile({
		...options,
		enabled: Boolean(accessToken),
	})
	React.useEffect(() => {
		if (error && !isPending) {
			router.push("/auth")
		}
	}, [error, isPending, router])
	return { ...rest, error, isPending }
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
