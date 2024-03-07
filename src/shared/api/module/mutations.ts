import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import {
	createModule,
	createModuleInFolder,
	CreateModuleInFolderPayload,
	CreateModuleInFolderResponse,
	CreateModulePayload,
	CreateModuleResponse,
	deleteModule,
	DeleteModulePayload,
	DeleteModuleResponse,
	updateModule,
	UpdateModulePayload,
	UpdateModuleResponse,
} from "./requests"
import { AxiosError } from "axios"

export function useCreateModuleMutation(
	options?: Omit<UseMutationOptions<CreateModuleResponse, AxiosError, CreateModulePayload>, "mutationFn">,
) {
	return useMutation({
		mutationFn: createModule,
		...options,
	})
}

export function useCreateModuleInFolderMutation(
	options?: Omit<
		UseMutationOptions<CreateModuleInFolderResponse, AxiosError, CreateModuleInFolderPayload>,
		"mutationFn"
	>,
) {
	return useMutation({
		mutationFn: createModuleInFolder,
		...options,
	})
}

export function useUpdateModuleMutation(
	options?: Omit<UseMutationOptions<UpdateModuleResponse, AxiosError, UpdateModulePayload>, "mutationFn">,
) {
	return useMutation({
		mutationFn: updateModule,
		...options,
	})
}

export function useDeleteModuleMutation(
	options?: Omit<UseMutationOptions<DeleteModuleResponse, AxiosError, DeleteModulePayload>, "mutationFn">,
) {
	return useMutation({
		mutationFn: deleteModule,
		...options,
	})
}
