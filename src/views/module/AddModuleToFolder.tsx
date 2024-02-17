import React from "react"
import { TermType } from "~/app/models"
import { ModuleEditor } from "~/widgets"
import { useQueryClient } from "@tanstack/react-query"
import { folderQueryKey, modulesQueryKey, useAddModuleToFolderMutation, useCreateModuleMutation } from "~/shared"

export function AddModuleToTheFolderPage(props: { id: string }) {
	const { id: folderId } = props
	const queryClient = useQueryClient()

	const createModule = useCreateModuleMutation({
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [modulesQueryKey] }),
	})

	const addModuleToTheFolder = useAddModuleToFolderMutation({
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [folderQueryKey, folderId] }),
	})

	async function createModuleAndAddToTheFolder(title: string, terms: TermType[]) {
		const newModule = await createModule.mutateAsync({ terms, title })
		addModuleToTheFolder.mutate({ moduleId: newModule.id, folderId })
	}

	return (
		<main className={"container"}>
			<ModuleEditor onSubmit={createModuleAndAddToTheFolder} />
		</main>
	)
}
