import { AxiosError } from "axios"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { getFolder, GetFolderResponse, getFolders, GetFoldersResponse } from "./requests"

export const foldersQueryKey = "folders-query-key"
export const folderQueryKey = "folder-query-key"

export const useFetchFolders = (options?: Omit<UseQueryOptions<GetFoldersResponse, AxiosError>, "queryFn">) => {
	return useQuery({
		queryKey: [foldersQueryKey],
		queryFn: getFolders,
		...options,
	})
}

export const useFetchFolder = (
	id: string,
	options?: Omit<UseQueryOptions<GetFolderResponse, AxiosError>, "queryFn">,
) => {
	return useQuery({
		queryKey: [folderQueryKey, id],
		queryFn: ({ queryKey }) => getFolder(queryKey[1] as string),
		...options,
	})
}
