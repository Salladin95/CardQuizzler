import { AxiosError } from "axios"
import { ModuleType } from "~/app/models"
import { mockModules } from "src/shared/lib/mock"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import {
	getDifficultModules,
	GetDifficultModulesResponse,
	getModule,
	GetModuleResponse,
	getRecentOpenedModules,
	GetRecentOpenedModulesResponse,
} from "./requests"

export const modulesQueryKey = "modules-query-key"
export const moduleQueryKey = "module-query-key"
export const lastActionsQueryKey = "last-actions-query-key"
export const difficultModulesQueryKey = "difficult-modules-query-key"
export const useFetchModules = (options?: Omit<UseQueryOptions<ModuleType[], AxiosError>, "queryFn">) => {
	return useQuery({
		queryKey: [modulesQueryKey],
		queryFn: () => mockModules(),
		...options,
	})
}

export const useFetchModule = (
	id: string,
	options?: Omit<UseQueryOptions<GetModuleResponse, AxiosError>, "queryFn">,
) => {
	return useQuery({
		queryKey: [moduleQueryKey, id],
		queryFn: ({ queryKey }) => getModule(queryKey[1] as string),
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

export const useFetchLastActions = (
	options?: Omit<UseQueryOptions<GetRecentOpenedModulesResponse, AxiosError>, "queryFn">,
) => {
	return useQuery({
		queryKey: [lastActionsQueryKey],
		queryFn: getRecentOpenedModules,
		...options,
	})
}
