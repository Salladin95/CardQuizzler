import { AxiosError } from "axios"
import { useInfiniteQuery, useQuery, UseQueryOptions } from "@tanstack/react-query"
import {
	getDifficultModules,
	GetDifficultModulesResponse,
	getModule,
	GetModulePayload,
	GetModuleResponse,
	getModules,
	getModulesByTitle,
	GetModulesResponse,
} from "./requests"

export const modulesQueryKey = "modules-query-key"
export const moduleQueryKey = "module-query-key"
export const recentActionsQueryKey = "last-actions-query-key"
export const modulesByTitleQueryKey = "modules-by-title-query-key"
export const difficultModulesQueryKey = "difficult-modules-query-key"
export const infiniteModulesQueryKey = "infinite-modules-by-title-query-key"

export const useFetchModules = (
	options?: Omit<UseQueryOptions<GetModulesResponse, AxiosError>, "queryFn" | "queryKey">,
) => {
	return useQuery({
		queryKey: [modulesQueryKey],
		queryFn: () => getModules(),
		...options,
	})
}

export const useFetchModulesByTitle = (
	{ title }: { title: string },
	options?: Omit<UseQueryOptions<GetModulesResponse, AxiosError>, "queryFn" | "queryKey">,
) => {
	return useQuery({
		queryKey: [modulesByTitleQueryKey, title],
		queryFn: () => getModulesByTitle({ title }),
		...options,
	})
}

export const useInfiniteModulesByTitle = (title: string) => {
	return useInfiniteQuery({
		queryKey: [infiniteModulesQueryKey],
		queryFn: ({ pageParam }) => getModulesByTitle({ title, page: pageParam, limit: 4 }),
		initialPageParam: 0,
		enabled: Boolean(title),
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
			if (lastPage.length === 0) {
				return undefined
			}
			return lastPageParam + 1
		},
		getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
			if (firstPageParam <= 1) {
				return undefined
			}
			return firstPageParam - 1
		},
	})
}

export const useFetchModule = (
	{ password, id }: GetModulePayload,
	options?: Omit<UseQueryOptions<GetModuleResponse, AxiosError>, "queryFn" | "queryKey">,
) => {
	return useQuery({
		queryKey: [moduleQueryKey, id, password],
		queryFn: () => getModule({ id, password }),
		...options,
	})
}

export const useFetchDifficultModules = (
	options?: Omit<UseQueryOptions<GetDifficultModulesResponse, AxiosError>, "queryFn">,
) => {
	return useQuery({
		queryKey: [difficultModulesQueryKey],
		queryFn: getDifficultModules,
		...options,
	})
}

export const useFetchLastActions = (options?: Omit<UseQueryOptions<GetModulesResponse, AxiosError>, "queryFn">) => {
	return useQuery({
		queryKey: [recentActionsQueryKey],
		queryFn: () => getModules({ sortBy: "updated_at-" }),
		...options,
	})
}
