import { AxiosError } from "axios"
import { useInfiniteQuery, useQuery, UseQueryOptions } from "@tanstack/react-query"
import {
	getFolder,
	GetFolderPayload,
	GetFolderResponse,
	getFolders,
	getFoldersByTitle,
	GetFoldersResponse,
} from "./requests"

export const foldersQueryKey = "folders-query-key"
export const foldersByTitleQueryKey = "folders-by-title-query-key"
export const folderQueryKey = "folder-query-key"
export const infiniteFoldersQueryKey = "infinite-folders-by-title-query-key"

export const useFetchFolders = (options?: Omit<UseQueryOptions<GetFoldersResponse, AxiosError>, "queryFn">) => {
	return useQuery({
		queryKey: [foldersQueryKey],
		queryFn: () => getFolders(),
		...options,
	})
}

export const useFetchFoldersByTitle = (
	{ title }: { title: string },
	options?: Omit<UseQueryOptions<GetFoldersResponse, AxiosError>, "queryFn" | "queryKey">,
) => {
	return useQuery({
		queryKey: [foldersByTitleQueryKey, title],
		queryFn: () => getFoldersByTitle({ title }),
		...options,
	})
}

export const useInfiniteFoldersByTitle = (title: string) => {
	return useInfiniteQuery({
		queryKey: [infiniteFoldersQueryKey],
		queryFn: ({ pageParam }) => getFoldersByTitle({ title, page: pageParam, limit: 4 }),
		enabled: Boolean(title),
		initialPageParam: 0,
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
			if (lastPage.length === 0) {
				return undefined
			}
			return lastPageParam + 1
		},
		getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
			if (firstPageParam <= 1) {
				return undefined
			}
			return firstPageParam - 1
		},
	})
}

export const useFetchFolder = (
	payload: GetFolderPayload,
	options?: Omit<UseQueryOptions<GetFolderResponse, AxiosError>, "queryFn" | "queryKey">,
) => {
	return useQuery({
		queryKey: [folderQueryKey, payload.id],
		queryFn: () => getFolder(payload),
		...options,
	})
}
