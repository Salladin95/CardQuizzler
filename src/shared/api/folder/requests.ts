import { FolderType } from "~/app/models"
import { mockCreateFolder, mockFolder, mockFolders, mockGetFolder } from "~/lib/mock"

export type GetFolderPayload = string
export type GetFolderResponse = FolderType

export function getFolder(id: GetFolderPayload): Promise<GetFolderResponse> {
	// TODO: REPLACE MOCK LOGIC
	return Promise.resolve(mockGetFolder(id))
}

export type GetFoldersResponse = FolderType[]

export function getFolders(): Promise<GetFoldersResponse> {
	// TODO: REPLACE MOCK LOGIC
	return Promise.resolve(mockFolders())
}

export type CreateFolderPayload = string
export type CreateFolderResponse = FolderType

export function createFolder(folderName: CreateFolderPayload): Promise<CreateFolderResponse> {
	// TODO: REPLACE MOCK LOGIC
	return Promise.resolve(mockCreateFolder(folderName))
}

export type UpdateFolderPayload = {
	folderName: string
	id: string
}
export type UpdateFolderResponse = FolderType

export function updateFolder(payload: UpdateFolderPayload): Promise<UpdateFolderResponse> {
	// TODO: REPLACE MOCK LOGIC
	return Promise.resolve(mockCreateFolder(payload.folderName))
}

export type DeleteFolderPayload = string
export type DeleteFolderResponse = string

export function deleteFolder(id: DeleteFolderPayload): Promise<DeleteFolderResponse> {
	console.log("DELETING FOLDER")
	return Promise.resolve("SUCCESS")
}

export type AddModuleToFolderPayload = { moduleId: string; folderId: string }
export type AddModuleToFolderResponse = FolderType

export function addModuleToFolder(payload: AddModuleToFolderPayload): Promise<AddModuleToFolderResponse> {
	return Promise.resolve(mockFolder())
}

export type DeleteModuleFromFolderPayload = AddModuleToFolderPayload
export type DeleteModuleFromFolderResponse = string

export function deleteModuleFromFolder(
	payload: DeleteModuleFromFolderPayload,
): Promise<DeleteModuleFromFolderResponse> {
	return Promise.resolve("SUCCESS")
}
