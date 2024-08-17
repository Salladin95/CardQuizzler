import React from "react"
import axios from "~/app/axios"
import { AxiosError } from "axios"
import { Profile } from "~/app/models"
import { JsonResponse } from "~/shared"
import { useRouter } from "next/navigation"
import { useLocalStorage } from "react-use"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"

export type FetchProfileResponse = Profile

export function signOut(): Promise<void> {
	localStorage.clear()
	return axios.get("/sign-out")
}

export const userByIdQueryKey = "user-by-id-query-key"

export async function getUserByID(id: string): Promise<FetchProfileResponse> {
	const res = await axios.get<JsonResponse<FetchProfileResponse>>(`/user/${id}`)
	return res.data.data
}

export const useGetUserById = (
	id: string,
	options?: Omit<UseQueryOptions<FetchProfileResponse, AxiosError>, "queryFn" | "queryKey">,
) => {
	return useQuery({
		queryKey: [userByIdQueryKey, id],
		queryFn: ({ queryKey }) => getUserByID(queryKey[1] as string),
		...options,
	})
}

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
		switch (true) {
			case !accessToken:
				return router.push("/auth")
			case !isPending:
				if (error) {
					router.push("/auth")
				}
		}
	}, [accessToken, error, isPending, router])
	return { ...rest, error, isPending }
}
