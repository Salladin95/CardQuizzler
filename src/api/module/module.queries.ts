import { AxiosError } from "axios"
import { ModuleType } from "~/app/models"
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query"
import { mockGetModule, mockModules } from "~/lib/mock"
import {
	createModule,
	CreateModulePayload,
	deleteModule,
	DeleteModuleResult,
	updateModule,
	UpdateModulePayload,
} from "./module.requests"

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

export const useFetchModule = (id: string, options?: Omit<UseQueryOptions<ModuleType, AxiosError>, "queryFn">) => {
	return useQuery({
		queryKey: [moduleQueryKey, id],
		queryFn: ({ queryKey }) => mockGetModule(queryKey[1] as string),
		...options,
	})
}

export const useFetchDifficultModules = (options?: Omit<UseQueryOptions<ModuleType[], AxiosError>, "queryFn">) => {
	return useQuery({
		queryKey: [difficultModulesQueryKey],
		queryFn: () => mockModules(),
		...options,
	})
}

export const useFetchLastActions = (options?: Omit<UseQueryOptions<ModuleType[], AxiosError>, "queryFn">) => {
	return useQuery({
		queryKey: [lastActionsQueryKey],
		queryFn: () => mockModules(),
		...options,
	})
}

export function useCreateModuleMutation(
	options?: Omit<UseMutationOptions<ModuleType, AxiosError, CreateModulePayload>, "mutationFn">,
) {
	return useMutation({
		mutationFn: (folderName) => createModule(folderName),
		...options,
	})
}

export function useUpdateModuleMutation(
	options?: Omit<UseMutationOptions<ModuleType, AxiosError, UpdateModulePayload>, "mutationFn">,
) {
	return useMutation({
		mutationFn: (payload) => updateModule(payload),
		...options,
	})
}

export function useDeleteModuleMutation(
	options?: Omit<UseMutationOptions<DeleteModuleResult, AxiosError, string>, "mutationFn">,
) {
	return useMutation({
		mutationFn: (id) => deleteModule(id),
		...options,
	})
}
