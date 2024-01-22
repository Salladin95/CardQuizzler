import { AxiosError } from "axios"
import { FolderType } from "~/app/models"
import { mockFolders, mockGetFolder } from "~/lib/mock"
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
	return useQuery({
		queryKey: [foldersQueryKey],
		queryFn: () => mockFolders(),
		...options,
	})
}

export const useFetchFolder = (id: string, options?: Omit<UseQueryOptions<FolderType, AxiosError>, "queryFn">) => {
	return useQuery({
		queryKey: [folderQueryKey, id],
		queryFn: ({ queryKey }) => mockGetFolder(queryKey[1] as string),
		...options,
	})
}

export function useCreateFolderMutation(
	options?: Omit<UseMutationOptions<FolderType, AxiosError, CreateFolderPayload>, "mutationFn">,
) {
	return useMutation({
		mutationFn: (folderName) => createFolder(folderName),
		...options,
	})
}

export function useUpdateFolderMutation(
	options?: Omit<UseMutationOptions<FolderType, AxiosError, UpdateFolderPayload>, "mutationFn">,
) {
	return useMutation({
		mutationFn: (payload) => updateFolder(payload),
		...options,
	})
}

export function useAddModuleToFolderMutation(
	options?: Omit<UseMutationOptions<FolderType, AxiosError, AddModuleToFolderPayload>, "mutationFn">,
) {
	return useMutation({
		mutationFn: (payload) => addModuleToFolder(payload),
		...options,
	})
}

export function useDeleteModuleFromFolderMutation(
	options?: Omit<
		UseMutationOptions<DeleteModuleFromFolderResponse, AxiosError, DeleteModuleFromFolderPayload>,
		"mutationFn"
	>,
) {
	return useMutation({
		mutationFn: (payload) => deleteModuleFromFolder(payload),
		...options,
	})
}

export function useDeleteFolderMutation(
	options?: Omit<UseMutationOptions<DeleteFolderResult, AxiosError, string>, "mutationFn">,
) {
	return useMutation({
		mutationFn: (id) => deleteFolder(id),
		...options,
	})
}
