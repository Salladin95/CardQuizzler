import { FolderType } from "~/app/models"

/**
 * Checks whether the folder contains module with given id
 * @param folder
 * @param moduleId
 * @return boolean
 */
export function isModuleInFolder(folder: FolderType, moduleId: string): boolean {
	return Boolean(folder.modules.find((module) => module.id === moduleId))
}
