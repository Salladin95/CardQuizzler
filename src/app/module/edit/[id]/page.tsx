"use client"
import React from "react"
import { ModuleType, TermType } from "~/app/models"
import { WithId, WithParamsId } from "~/app/types"
import { ModuleEditor } from "~/widgets/moduleEditor"
import { useQueryClient } from "@tanstack/react-query"
import { DataHydration, LoadingDataRenderer } from "~/shared"
import { getModule, moduleQueryKey, modulesQueryKey, useFetchModule, useUpdateModuleMutation } from "~/api"

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

function EditModulePage(props: WithId) {
	const { data, isLoading } = useFetchModule(props.id)
	return LoadingDataRenderer<ModuleType>({ Comp: EditModule, data, isLoading })
}

export default function ModuleWithDataHydration(props: WithParamsId) {
	const { params } = props
	return (
		<DataHydration<ModuleType> getData={() => getModule(params.id)} queryKeys={[moduleQueryKey, params.id]}>
			<EditModulePage id={params.id} />
		</DataHydration>
	)
}
