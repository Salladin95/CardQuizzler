import React from "react"
import axios from "~/app/axios"
import { AxiosError } from "axios"
import { Profile } from "~/app/models"
import { JsonResponse } from "~/shared"
import { useRouter } from "next/navigation"
import { useLocalStorage } from "react-use"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"

export type FetchProfileResponse = Profile

export async function getProfile(): Promise<FetchProfileResponse> {
	const res = await axios.get<JsonResponse<Profile>>("/user/profile")
	return res.data.data
}

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
