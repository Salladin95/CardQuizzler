import { AxiosError } from "axios"
import { FolderType } from "~/app/models"
import { mockFolders, mockGetFolder } from "~/lib/mock"
import useApiErrorToast from "~/shared/hooks/useApiErrorToast"
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query"
import {
	addModuleToFolder,
	AddModuleToFolderPayload,
	createFolder,
	CreateFolderPayload,
	deleteFolder,
	DeleteFolderResult,
	deleteModuleFromFolder,
	DeleteModuleFromFolderPayload,
	DeleteModuleFromFolderResponse,
	updateFolder,
	UpdateFolderPayload,
} from "./folder.requests"

export const foldersQueryKey = "folders-query-key"
export const folderQueryKey = "folder-query-key"

export const useFetchFolders = (options?: Omit<UseQueryOptions<FolderType[], AxiosError>, "queryFn">) => {
	const apiErrorToast = useApiErrorToast()
	return useQuery({
		queryKey: [foldersQueryKey],
		queryFn: () => mockFolders(),
		onError: apiErrorToast,
		...options,
	})
}

export const useFetchFolder = (id: string, options?: Omit<UseQueryOptions<FolderType, AxiosError>, "queryFn">) => {
	const apiErrorToast = useApiErrorToast()
	return useQuery({
		queryKey: [folderQueryKey, id],
		queryFn: ({ queryKey }) => mockGetFolder(queryKey[1] as string),
		onError: apiErrorToast,
		...options,
	})
}

export function useCreateFolderMutation(
	options?: Omit<UseMutationOptions<FolderType, AxiosError, CreateFolderPayload>, "mutationFn">,
) {
	const apiErrorToast = useApiErrorToast()
	return useMutation({
		mutationFn: (folderName) => createFolder(folderName),
		onError: apiErrorToast,
		...options,
	})
}

export function useUpdateFolderMutation(
	options?: Omit<UseMutationOptions<FolderType, AxiosError, UpdateFolderPayload>, "mutationFn">,
) {
	const apiErrorToast = useApiErrorToast()
	return useMutation({
		mutationFn: (payload) => updateFolder(payload),
		onError: apiErrorToast,
		...options,
	})
}

export function useAddModuleToFolderMutation(
	options?: Omit<UseMutationOptions<FolderType, AxiosError, AddModuleToFolderPayload>, "mutationFn">,
) {
	const apiErrorToast = useApiErrorToast()
	return useMutation({
		mutationFn: (payload) => addModuleToFolder(payload),
		onError: apiErrorToast,
		...options,
	})
}

export function useDeleteModuleFromFolderMutation(
	options?: Omit<
		UseMutationOptions<DeleteModuleFromFolderResponse, AxiosError, DeleteModuleFromFolderPayload>,
		"mutationFn"
	>,
) {
	const apiErrorToast = useApiErrorToast()
	return useMutation({
		mutationFn: (payload) => deleteModuleFromFolder(payload),
		onError: apiErrorToast,
		...options,
	})
}

export function useDeleteFolderMutation(
	options?: Omit<UseMutationOptions<DeleteFolderResult, AxiosError, string>, "mutationFn">,
) {
	const apiErrorToast = useApiErrorToast()
	return useMutation({
		mutationFn: (id) => deleteFolder(id),
		onError: apiErrorToast,
		...options,
	})
}
