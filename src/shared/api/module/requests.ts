import axios from "~/app/axios"
import { AxiosResponse } from "axios"
import { SecureAccess } from "~/app/types"
import { ModuleType, TermType } from "~/app/models"
import { JsonResponse, SortOptions } from "~/shared"

export type GetModulePayload = {
	id: string
	password?: string
}
export type GetModuleResponse = ModuleType

const modulesDefaultLimit = 25

export async function getModule({ id, password = "" }: GetModulePayload): Promise<GetModuleResponse> {
	const res = await axios.get<JsonResponse<GetModuleResponse>>(`module/${id}?password=${password}`)
	return res.data.data
}

export type GetModulesResponse = ModuleType[]

export async function getModules(sortOptions?: SortOptions): Promise<GetModulesResponse> {
	const parsedOptions = {
		limit: sortOptions?.limit || modulesDefaultLimit,
		page: sortOptions?.page || 1,
		sortBy: sortOptions?.sortBy || "created_at-",
	}
	const res = await axios.get<JsonResponse<GetModulesResponse>>(
		`module?page=${parsedOptions.page}&limit=${parsedOptions.limit}&sortBy=${parsedOptions.sortBy}`,
	)
	return res.data.data
}

export type GetDifficultModulesResponse = ModuleType[]

export async function getDifficultModules(): Promise<GetDifficultModulesResponse> {
	const res = await axios.get<JsonResponse<GetModulesResponse>>("difficult-modules")
	return res.data.data
}

export type CreateTermPayload = {
	id: string
	title: string
	description: string
}
export type CreateModulePayload = {
	title: string
	terms: CreateTermPayload[]
} & SecureAccess
export type CreateModuleResponse = ModuleType

export async function createModule(payload: CreateModulePayload): Promise<CreateModuleResponse> {
	const res = await axios.post<JsonResponse<ModuleType>>("module", payload)
	return res.data.data
}

export type CopyModulePayload = {
	id: string
	password?: string
}
export type CopyModuleResponse = number

export async function copyModule(payload: CopyModulePayload): Promise<CopyModuleResponse> {
	const { id, password } = payload
	let url = `copy-module/${id}`
	if (password) {
		url += `password=${password}`
	}
	const res = await axios.post<string>(url)
	return res.status
}

export type CreateModuleInFolderPayload = CreateModulePayload & {
	folderID: string
}
export type CreateModuleInFolderResponse = ModuleType

export async function createModuleInFolder({
	folderID,
	...payload
}: CreateModuleInFolderPayload): Promise<CreateModuleInFolderResponse> {
	const res = await axios.post<JsonResponse<ModuleType>>(`module/${folderID}`, payload)
	return res.data.data
}

export type UpdateModulePayload = {
	title?: string
	newTerms?: CreateTermPayload[]
	updatedTerms?: TermType[]
	id: string
} & SecureAccess
export type UpdateModuleResponse = ModuleType

export async function updateModule({ id, ...payload }: UpdateModulePayload): Promise<UpdateModuleResponse> {
	const res = await axios.patch<JsonResponse<ModuleType>>(`module/${id}`, payload)
	return res.data.data
}

export type DeleteModulePayload = string
export type DeleteModuleResponse = AxiosResponse<JsonResponse<null>>

export async function deleteModule(id: DeleteModulePayload): Promise<DeleteModuleResponse> {
	return axios.delete<JsonResponse<null>>(`module/${id}`)
}

export type UpdateTermPayload = Omit<TermType, "title" | "description"> & {
	title?: string
	description?: string
}
export type UpdateTermResponse = AxiosResponse<JsonResponse<null>>

export async function updateTerm({ id, ...payload }: UpdateTermPayload): Promise<UpdateTermResponse> {
	return axios.patch<JsonResponse<null>>(`term/${id}`, payload)
}
