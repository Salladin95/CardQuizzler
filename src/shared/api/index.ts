import axios from "~/app/axios"
import { SwiperCard } from "~/features"
import { AxiosError, AxiosResponse } from "axios"
import { HomePageData, TermType } from "~/app/models"
import { DeleteModuleResponse, getDifficultModules, getFolders, getModules } from "~/shared"
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query"

export type SortOptions = {
	page?: number
	sortBy?: string
	limit?: number
}

export type GetByTitlePayload = {
	title: string
} & SortOptions

export type JsonResponse<T> = {
	message: string
	data: T
}

export const homeDataKey = "home-page-date-key"

export async function getHomePageData(): Promise<HomePageData> {
	const folders = await getFolders()
	const modules = await getModules()
	const difficultModules = await getDifficultModules()
	const lastActions = await getModules({ sortBy: "updated_at-" })
	return Promise.resolve({ folders, modules, lastActions, difficultModules })
}

export type ProcessQuizResultPayload = { moduleID?: string; terms: SwiperCard<TermType>[] }
export type ProcessQuizResultResponse = AxiosResponse<JsonResponse<null>>

export async function processQuizResult(payload: ProcessQuizResultPayload): Promise<DeleteModuleResponse> {
	return axios.patch<JsonResponse<null>>(`process-quiz-result`, payload)
}

export const useFetchHomePageData = (options?: Omit<UseQueryOptions<HomePageData, AxiosError>, "queryFn">) => {
	return useQuery({
		queryKey: [homeDataKey],
		queryFn: getHomePageData,
		...options,
	})
}

export function useProcessQuizResult(
	options?: Omit<UseMutationOptions<ProcessQuizResultResponse, AxiosError, ProcessQuizResultPayload>, "mutationFn">,
) {
	return useMutation({
		mutationFn: processQuizResult,
		...options,
	})
}

export * from "./folder"
export * from "./module"
export * from "./profile"
export * from "./refresh"
export * from "./updateEmail"
export * from "./password"
export * from "./requestEmailVerification"
