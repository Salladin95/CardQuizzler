import { FolderType, ModuleType } from "~/app/models"
import { AxiosError } from "axios"
import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query"
import { mockFolders, mockGetFolder, mockGetModule, mockModules } from "~/lib/mock"
import useApiErrorToast from "~/shared/hooks/useApiErrorToast"

export const foldersQueryKey = "folders-query-key"
export const folderQueryKey = "folder-query-key"
export const modulesQueryKey = "modules-query-key"
export const moduleQueryKey = "module-query-key"
export const lastActionsQueryKey = "last-actions-query-key"
export const difficultModulesQueryKey = "difficult-modules-query-key"
export const homeDataKeys = [foldersQueryKey, modulesQueryKey, lastActionsQueryKey, difficultModulesQueryKey]

export const useFetchFolders = (
	options?: Omit<UseQueryOptions<FolderType[], AxiosError>, "queryFn">,
): UseQueryResult<FolderType[], AxiosError> => {
	const apiErrorToast = useApiErrorToast()
	return useQuery<FolderType[], AxiosError>({
		queryKey: [foldersQueryKey],
		queryFn: () => mockFolders(),
		onError: apiErrorToast,
		...options,
	})
}

export const useFetchFolder = (
	id: string,
	options?: Omit<UseQueryOptions<FolderType, AxiosError>, "queryFn">,
): UseQueryResult<FolderType, AxiosError> => {
	const apiErrorToast = useApiErrorToast()
	return useQuery<FolderType, AxiosError>({
		queryKey: [folderQueryKey, id],
		queryFn: ({ queryKey }) => mockGetFolder(queryKey[1] as string),
		onError: apiErrorToast,
		...options,
	})
}

export const useFetchModules = (
	options?: Omit<UseQueryOptions<ModuleType[], AxiosError>, "queryFn">,
): UseQueryResult<ModuleType[], AxiosError> => {
	const apiErrorToast = useApiErrorToast()
	return useQuery<ModuleType[], AxiosError>({
		queryKey: [modulesQueryKey],
		queryFn: () => mockModules(),
		onError: apiErrorToast,
		...options,
	})
}

export const useFetchModule = (
	id: string,
	options?: Omit<UseQueryOptions<ModuleType, AxiosError>, "queryFn">,
): UseQueryResult<ModuleType, AxiosError> => {
	const apiErrorToast = useApiErrorToast()
	return useQuery<ModuleType, AxiosError>({
		queryKey: [moduleQueryKey, id],
		queryFn: ({ queryKey }) => mockGetModule(queryKey[1] as string),
		onError: apiErrorToast,
		...options,
	})
}

export const useFetchDifficultModules = (
	options?: Omit<UseQueryOptions<ModuleType[], AxiosError>, "queryFn">,
): UseQueryResult<ModuleType[], AxiosError> => {
	const apiErrorToast = useApiErrorToast()
	return useQuery<ModuleType[], AxiosError>({
		queryKey: [difficultModulesQueryKey],
		queryFn: () => mockModules(),
		onError: apiErrorToast,
		...options,
	})
}

export const useFetchLastActions = (
	options?: Omit<UseQueryOptions<ModuleType[], AxiosError>, "queryFn">,
): UseQueryResult<ModuleType[], AxiosError> => {
	const apiErrorToast = useApiErrorToast()
	return useQuery<ModuleType[], AxiosError>({
		queryKey: [lastActionsQueryKey],
		queryFn: () => mockModules(),
		onError: apiErrorToast,
		...options,
	})
}
