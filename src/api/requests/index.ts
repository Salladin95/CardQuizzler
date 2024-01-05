import { HomePageData } from "~/app/models"
import { mockFolders, mockModules } from "~/lib/mock"

export function getHomePageData(): Promise<HomePageData> {
	// TODO: REPLACE MOCK LOGIC
	const folders = mockFolders()
	const modules = mockModules()
	const difficultModules = mockModules()
	const lastActions = mockModules()
	return Promise.resolve({ folders, modules, lastActions, difficultModules })
}

export * from "./folder.requests"
export * from "./module.requests"
