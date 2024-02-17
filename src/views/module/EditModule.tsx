"use client"
import React from "react"
import { WithId } from "~/app/types"
import { ModuleEditor } from "~/widgets"
import { ModuleType, TermType } from "~/app/models"
import { useQueryClient } from "@tanstack/react-query"
import { LoadingDataRenderer, modulesQueryKey, useFetchModule, useUpdateModuleMutation } from "~/shared"

function EditModule(props: ModuleType) {
	const { id, terms, title } = props

	const queryClient = useQueryClient()
	const updateModule = useUpdateModuleMutation({
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [modulesQueryKey, modulesQueryKey, id] }),
	})

	function handleUpdateModule(updatedTitle: string, updatedTerms: TermType[]) {
		updateModule.mutate({ terms: updatedTerms, title: updatedTitle, id })
	}

	return (
		<main className={"container"}>
			<ModuleEditor moduleName={title} terms={terms} onSubmit={handleUpdateModule} />
		</main>
	)
}

export function EditModulePage(props: WithId) {
	const { data, isLoading } = useFetchModule(props.id)
	return LoadingDataRenderer<ModuleType>({ Comp: EditModule, data, isLoading })
}
