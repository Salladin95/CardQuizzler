import React from "react"
import { ModuleEditor } from "~/widgets"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import {
	createEmptyTerms,
	CreateModulePayload,
	folderQueryKey,
	foldersQueryKey,
	modulesQueryKey,
	useCreateModuleInFolderMutation,
} from "~/shared"

export function CreateModuleInFolderPage(props: { id: string }) {
	const { id: folderID } = props
	const router = useRouter()
	const queryClient = useQueryClient()

	const createModuleInFolder = useCreateModuleInFolderMutation({
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [modulesQueryKey, foldersQueryKey, folderQueryKey, folderID] })
			router.push("/")
		},
	})

	async function handleSubmit(payload: CreateModulePayload) {
		createModuleInFolder.mutate({ ...payload, folderID })
	}

	return (
		<main className={"container"}>
			<ModuleEditor
				terms={createEmptyTerms(3)}
				onSubmit={handleSubmit}
				hasSubmitted={createModuleInFolder.isSuccess}
				isSubmitting={createModuleInFolder.isPending}
			/>
		</main>
	)
}
