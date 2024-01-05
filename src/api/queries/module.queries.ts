import { AxiosError } from "axios"
import { ModuleType } from "~/app/models"
import useApiErrorToast from "~/shared/hooks/useApiErrorToast"
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query"
import { mockGetModule, mockModules } from "~/lib/mock"
import {
	createModule,
	CreateModulePayload,
	deleteModule,
	DeleteModuleResult,
	updateModule,
	UpdateModulePayload,
} from "~/api"

export const modulesQueryKey = "modules-query-key"
export const moduleQueryKey = "module-query-key"
export const lastActionsQueryKey = "last-actions-query-key"
export const difficultModulesQueryKey = "difficult-modules-query-key"
export const useFetchModules = (options?: Omit<UseQueryOptions<ModuleType[], AxiosError>, "queryFn">) => {
	const apiErrorToast = useApiErrorToast()
	return useQuery({
		queryKey: [modulesQueryKey],
		queryFn: () => mockModules(),
		onError: apiErrorToast,
		...options,
	})
}

export const useFetchModule = (id: string, options?: Omit<UseQueryOptions<ModuleType, AxiosError>, "queryFn">) => {
	const apiErrorToast = useApiErrorToast()
	return useQuery({
		queryKey: [moduleQueryKey, id],
		queryFn: ({ queryKey }) => mockGetModule(queryKey[1] as string),
		onError: apiErrorToast,
		...options,
	})
}

export const useFetchDifficultModules = (options?: Omit<UseQueryOptions<ModuleType[], AxiosError>, "queryFn">) => {
	const apiErrorToast = useApiErrorToast()
	return useQuery({
		queryKey: [difficultModulesQueryKey],
		queryFn: () => mockModules(),
		onError: apiErrorToast,
		...options,
	})
}

export const useFetchLastActions = (options?: Omit<UseQueryOptions<ModuleType[], AxiosError>, "queryFn">) => {
	const apiErrorToast = useApiErrorToast()
	return useQuery({
		queryKey: [lastActionsQueryKey],
		queryFn: () => mockModules(),
		onError: apiErrorToast,
		...options,
	})
}

export function useCreateModuleMutation(
	options?: Omit<UseMutationOptions<ModuleType, AxiosError, CreateModulePayload>, "mutationFn">,
) {
	const apiErrorToast = useApiErrorToast()
	return useMutation({
		mutationFn: (folderName) => createModule(folderName),
		onError: apiErrorToast,
		...options,
	})
}

export function useUpdateModuleMutation(
	options?: Omit<UseMutationOptions<ModuleType, AxiosError, UpdateModulePayload>, "mutationFn">,
) {
	const apiErrorToast = useApiErrorToast()
	return useMutation({
		mutationFn: (payload) => updateModule(payload),
		onError: apiErrorToast,
		...options,
	})
}

export function useDeleteModuleMutation(
	options?: Omit<UseMutationOptions<DeleteModuleResult, AxiosError, string>, "mutationFn">,
) {
	const apiErrorToast = useApiErrorToast()
	return useMutation({
		mutationFn: (id) => deleteModule(id),
		onError: apiErrorToast,
		...options,
	})
}
