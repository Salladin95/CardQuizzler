import { AxiosError } from "axios"
import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import {
	addModuleToFolder,
	AddModuleToFolderPayload,
	AddModuleToFolderResponse,
	createFolder,
	CreateFolderPayload,
	CreateFolderResponse,
	deleteFolder,
	DeleteFolderResponse,
	deleteModuleFromFolder,
	DeleteModuleFromFolderPayload,
	DeleteModuleFromFolderResponse,
	updateFolder,
	UpdateFolderPayload,
	UpdateFolderResponse,
} from "./requests"

export function useCreateFolderMutation(
	options?: Omit<UseMutationOptions<CreateFolderResponse, AxiosError, CreateFolderPayload>, "mutationFn">,
) {
	return useMutation({
		mutationFn: createFolder,
		...options,
	})
}

export function useUpdateFolderMutation(
	options?: Omit<UseMutationOptions<UpdateFolderResponse, AxiosError, UpdateFolderPayload>, "mutationFn">,
) {
	return useMutation({
		mutationFn: updateFolder,
		...options,
	})
}

export function useAddModuleToFolderMutation(
	options?: Omit<UseMutationOptions<AddModuleToFolderResponse, AxiosError, AddModuleToFolderPayload>, "mutationFn">,
) {
	return useMutation({
		mutationFn: addModuleToFolder,
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
		mutationFn: deleteModuleFromFolder,
		...options,
	})
}

export function useDeleteFolderMutation(
	options?: Omit<UseMutationOptions<DeleteFolderResponse, AxiosError, string>, "mutationFn">,
) {
	return useMutation({
		mutationFn: deleteFolder,
		...options,
	})
}
