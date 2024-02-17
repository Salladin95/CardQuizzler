import { AxiosError } from "axios"
import { HomePageData } from "~/app/models"
import { mockFolders, mockModules } from "src/shared/lib/mock"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"

export type JsonResponse<T> = {
	message: string
	data: T
}

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

export * from "./folder"
export * from "./module"
export * from "./profile"
export * from "./refresh"
export * from "./requestEmailVerification"
