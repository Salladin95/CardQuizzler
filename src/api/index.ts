import { mockFolders, mockModules } from "~/lib/mock"
import { HomePageData } from "~/app/models"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { AxiosError } from "axios"

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

export const useFetchHomePageData = (options?: Omit<UseQueryOptions<HomePageData, AxiosError>, "queryFn">) => {
	return useQuery({
		queryKey: [homeDataKey],
		queryFn: getHomePageData,
		...options,
	})
}

export const homeDataKey = "home-page-date-key"
