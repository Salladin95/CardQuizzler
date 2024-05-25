import React from "react"
import { TermType } from "~/app/models"
import { ModuleEditor } from "~/widgets"
import { AccessType } from "~/app/types"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { folderQueryKey, foldersQueryKey, modulesQueryKey, useCreateModuleInFolderMutation } from "~/shared"

export function AddModuleToTheFolderPage(props: { id: string }) {
	const { id: folderID } = props
	const router = useRouter()
	const queryClient = useQueryClient()

	const createModuleInFolder = useCreateModuleInFolderMutation({
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [modulesQueryKey, foldersQueryKey, folderQueryKey, folderID] })
			router.push("/")
		},
	})

	async function handleSubmit(title: string, terms: TermType[], access: AccessType, password: string) {
		createModuleInFolder.mutate({ terms, title, folderID, access, password })
	}

	return (
		<main className={"container"}>
			<ModuleEditor
				onSubmit={handleSubmit}
				hasSubmitted={createModuleInFolder.isSuccess}
				isSubmitting={createModuleInFolder.isPending}
			/>
		</main>
	)
}
