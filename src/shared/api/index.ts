import { AxiosError } from "axios"
import { getDifficultModules, getFolders, getModules } from "~/shared"
import { HomePageData } from "~/app/models"
import { mockModules } from "src/shared/lib/mock"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"

export type JsonResponse<T> = {
	message: string
	data: T
}

export const homeDataKey = "home-page-date-key"

export async function getHomePageData(): Promise<HomePageData> {
	const folders = await getFolders()
	const modules = await getModules()
	const difficultModules = await getDifficultModules()
	// TODO: REPLACE MOCK LOGIC
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

export * from "./folder"
export * from "./module"
export * from "./profile"
export * from "./refresh"
export * from "./requestEmailVerification"
