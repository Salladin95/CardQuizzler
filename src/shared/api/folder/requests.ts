import axios from "~/app/axios"
import { JsonResponse } from "~/shared"
import { FolderType } from "~/app/models"

export type CopyFolderPayload = {
	id: string
	password?: string
}
export type CopyFolderResponse = number

export async function copyFolder(payload: CopyFolderPayload): Promise<CopyFolderResponse> {
	const { id, password } = payload
	let url = `copy-folder/${id}`
	if (password) {
		url += `password=${password}`
	}
	const res = await axios.post<string>(url)
	return res.status
}

export type GetFolderPayload = string
export type GetFolderResponse = FolderType

export async function getFolder(id: GetFolderPayload): Promise<GetFolderResponse> {
	const res = await axios.get<JsonResponse<FolderType>>(`/folder/${id}`)
	return res.data.data
}

export type GetFoldersResponse = FolderType[]

export async function getFolders(): Promise<GetFoldersResponse> {
	const res = await axios.get<JsonResponse<FolderType[]>>("/folder")
	return res.data.data
}

export type CreateFolderPayload = {
	title: string
}
export type CreateFolderResponse = FolderType

export async function createFolder(payload: CreateFolderPayload): Promise<CreateFolderResponse> {
	const res = await axios.post<JsonResponse<FolderType>>("/folder", payload)
	return res.data.data
}

export type UpdateFolderPayload = {
	title: string
	id: string
}
export type UpdateFolderResponse = FolderType

export async function updateFolder(payload: UpdateFolderPayload): Promise<UpdateFolderResponse> {
	const res = await axios.patch<JsonResponse<FolderType>>(`/folder/${payload.id}`, { title: payload.title })
	return res.data.data
}

export type DeleteFolderPayload = string
export type DeleteFolderResponse = string

export async function deleteFolder(id: DeleteFolderPayload): Promise<DeleteFolderResponse> {
	const res = await axios.delete<JsonResponse<JsonResponse<null>>>(`/folder/${id}`)
	return res.data.message
}

export type AddModuleToFolderPayload = { moduleId: string; folderId: string }
export type AddModuleToFolderResponse = string

export async function addModuleToFolder(payload: AddModuleToFolderPayload): Promise<AddModuleToFolderResponse> {
	const res = await axios.patch<JsonResponse<null>>(
		`/add-module-to-folder?moduleID=${payload.moduleId}&folderID=${payload.folderId}`,
	)
	return res.data.message
}

export type DeleteModuleFromFolderPayload = AddModuleToFolderPayload
export type DeleteModuleFromFolderResponse = string

export async function deleteModuleFromFolder(
	payload: DeleteModuleFromFolderPayload,
): Promise<DeleteModuleFromFolderResponse> {
	const res = await axios.patch<JsonResponse<null>>(
		`/delete-module-from-folder?moduleID=${payload.moduleId}&folderID=${payload.folderId}`,
	)
	return res.data.message
}
