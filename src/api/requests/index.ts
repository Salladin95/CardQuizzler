import { FolderType, HomePageData, ModuleType } from "~/app/models"
import { mockFolders, mockGetFolder, mockGetModule, mockModules } from "~/lib/mock"

export function getHomePageData(): Promise<HomePageData> {
	// TODO: REPLACE MOCK LOGIC
	const folders = mockFolders()
	const modules = mockModules()
	const difficultModules = mockModules()
	const lastActions = mockModules()
	return Promise.resolve({ folders, modules, lastActions, difficultModules })
}

export function getFolder(id: string): Promise<FolderType> {
	// TODO: REPLACE MOCK LOGIC
	return Promise.resolve(mockGetFolder(id))
}

export function getModule(id: string): Promise<ModuleType> {
	// TODO: REPLACE MOCK LOGIC
	return Promise.resolve(mockGetModule(id))
}
