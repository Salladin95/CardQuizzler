import { mockFolders, mockModules } from "~/lib/mock"
import { HomePageData } from "~/app/models"
import { foldersQueryKey } from "./folder"
import { difficultModulesQueryKey, lastActionsQueryKey, modulesQueryKey } from "./module"

export * from "./auth"
export * from "./folder"
export * from "./module"
export * from "./profile"

export function getHomePageData(): Promise<HomePageData> {
	// TODO: REPLACE MOCK LOGIC
	const folders = mockFolders()
	const modules = mockModules()
	const difficultModules = mockModules()
	const lastActions = mockModules()
	return Promise.resolve({ folders, modules, lastActions, difficultModules })
}

export const homeDataKeys = [foldersQueryKey, modulesQueryKey, lastActionsQueryKey, difficultModulesQueryKey]
