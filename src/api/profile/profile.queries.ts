import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { fetchProfile, FetchProfileResponse } from "~/api"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import useApiErrorToast from "~/shared/hooks/useApiErrorToast"

export const profileQueryKey = "profile-query-key"

export const useFetchProfile = (options?: Omit<UseQueryOptions<FetchProfileResponse, AxiosError>, "queryFn">) => {
	const apiErrorToast = useApiErrorToast()
	return useQuery({
		queryKey: [profileQueryKey],
		queryFn: fetchProfile,
		onError: apiErrorToast,
		...options,
	})
}

export const useProtectedFetchProfile = (options?: Parameters<typeof useFetchProfile>[0]) => {
	const router = useRouter()
	return useFetchProfile({
		onError: () => router.push("/auth/sign-in"),
		...options,
	})
}
