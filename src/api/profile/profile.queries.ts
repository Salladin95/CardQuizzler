import { AxiosError } from "axios"
import { FetchProfileResponse, getProfile } from "~/api"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import React from "react"

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
	const { error, isPending, ...rest } = useProfile(options)
	React.useEffect(() => {
		if (error && !isPending) {
			router.push("/auth")
		}
	}, [error, isPending, router])
	return { ...rest, error, isPending }
}
