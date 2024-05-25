import { AxiosError } from "axios"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import {
	getDifficultModules,
	GetDifficultModulesResponse,
	getModule,
	GetModulePayload,
	GetModuleResponse,
	getModules,
	GetModulesResponse,
} from "./requests"

export const modulesQueryKey = "modules-query-key"
export const moduleQueryKey = "module-query-key"
export const recentActionsQueryKey = "last-actions-query-key"
export const difficultModulesQueryKey = "difficult-modules-query-key"
export const useFetchModules = (options?: Omit<UseQueryOptions<GetModulesResponse, AxiosError>, "queryFn">) => {
	return useQuery({
		queryKey: [modulesQueryKey],
		queryFn: () => getModules(),
		...options,
	})
}

export const useFetchModule = (
	{ password, id }: GetModulePayload,
	options?: Omit<UseQueryOptions<GetModuleResponse, AxiosError>, "queryFn">,
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
