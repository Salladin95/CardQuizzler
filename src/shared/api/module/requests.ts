import axios from "~/app/axios"
import { JsonResponse } from "~/shared"
import { ModuleType, TermType } from "~/app/models"
import { mockModules } from "src/shared/lib/mock"
import { AxiosResponse } from "axios"

export type GetModulePayload = string
export type GetModuleResponse = ModuleType

export async function getModule(id: GetModulePayload): Promise<GetModuleResponse> {
	const res = await axios.get<JsonResponse<GetModuleResponse>>(`module/${id}`)
	return res.data.data
}

export type GetModulesResponse = ModuleType[]

export async function getModules(): Promise<GetModulesResponse> {
	const res = await axios.get<JsonResponse<GetModulesResponse>>("module")
	return res.data.data
}

export type GetDifficultModulesResponse = ModuleType[]

export async function getDifficultModules(): Promise<GetDifficultModulesResponse> {
	const res = await axios.get<JsonResponse<GetModulesResponse>>("difficult-modules")
	return res.data.data
}

export type GetRecentOpenedModulesResponse = ModuleType[]

export async function getRecentOpenedModules(): Promise<GetDifficultModulesResponse> {
	// TODO: REPLACE MOCK LOGIC
	return Promise.resolve(mockModules())
}

export type CreateModulePayload = Omit<ModuleType, "id">
export type CreateModuleResponse = ModuleType

export async function createModule(payload: CreateModulePayload): Promise<CreateModuleResponse> {
	const res = await axios.post<JsonResponse<ModuleType>>("module", payload)
	return res.data.data
}

export type CreateModuleInFolderPayload = Omit<ModuleType, "id"> & {
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
	newTerms?: TermType[]
	updatedTerms?: TermType[]
	id: string
}
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
