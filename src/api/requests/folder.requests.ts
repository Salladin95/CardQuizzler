import { FolderType, ModuleType } from "~/app/models"
import { mockCreateFolder, mockFolder, mockGetFolder, mockGetModule } from "~/lib/mock"

export function getFolder(id: string): Promise<FolderType> {
	// TODO: REPLACE MOCK LOGIC
	return Promise.resolve(mockGetFolder(id))
}

export function getModule(id: string): Promise<ModuleType> {
	// TODO: REPLACE MOCK LOGIC
	return Promise.resolve(mockGetModule(id))
}

export type CreateFolderPayload = string

export function createFolder(folderName: CreateFolderPayload): Promise<FolderType> {
	// TODO: REPLACE MOCK LOGIC
	return Promise.resolve(mockCreateFolder(folderName))
}

export type UpdateFolderPayload = {
	folderName: string
	id: string
}

export function updateFolder(payload: UpdateFolderPayload): Promise<FolderType> {
	// TODO: REPLACE MOCK LOGIC
	return Promise.resolve(mockCreateFolder(payload.folderName))
}

export type DeleteFolderResult = string

export function deleteFolder(id: string) {
	console.log("DELETING FOLDER")
	return Promise.resolve("SUCCESS")
}

export type AddModuleToFolderPayload = { moduleId: string; folderId: string }
export function addModuleToFolder(payload: AddModuleToFolderPayload): Promise<FolderType> {
	return Promise.resolve(mockFolder())
}
