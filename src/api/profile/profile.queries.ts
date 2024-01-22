import { AxiosError } from "axios"
import { fetchProfile, FetchProfileResponse } from "~/api"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export const profileQueryKey = "profile-query-key"

export const useProfile = (
	options?: Omit<UseQueryOptions<FetchProfileResponse, AxiosError>, "queryFn" | "queryKey">,
) => {
	return useQuery({
		queryKey: [profileQueryKey],
		queryFn: fetchProfile,
		...options,
	})
}

export const useProtectedProfile = (options?: Parameters<typeof useProfile>[0]) => {
	const router = useRouter()
	const { error, ...rest } = useProfile({
		...options,
	})

	if (error) {
		router.push("/auth")
	}
	return rest
}
