import { FolderType } from "~/app/models"

/**
 * Checks whether the folder contains module with given id
 * @param folder
 * @param moduleId
 * @return boolean
 */
export function hasFolderTheModule(folder: FolderType, moduleId: string): boolean {
	const modules = new Set(folder.modules.map((module) => module.id))
	return modules.has(moduleId)
}
