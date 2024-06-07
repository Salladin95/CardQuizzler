import { AxiosError } from "axios"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { getFolder, GetFolderPayload, GetFolderResponse, getFolders, GetFoldersResponse } from "./requests"

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
	payload: GetFolderPayload,
	options?: Omit<UseQueryOptions<GetFolderResponse, AxiosError>, "queryFn" | "queryKey">,
) => {
	return useQuery({
		queryKey: [folderQueryKey, payload.id],
		queryFn: () => getFolder(payload),
		...options,
	})
}
