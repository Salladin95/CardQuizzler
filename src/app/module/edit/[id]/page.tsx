"use client"
import React from "react"
import { ModuleEditor } from "~/widgets/moduleEditor"
import { mockTerms } from "~/lib/mock"
import { modulesQueryKey, useUpdateModuleMutation } from "~/api"
import { WithParamsId } from "~/app/types"
import { TermType } from "~/app/models"
import { useQueryClient } from "@tanstack/react-query"

export default function EditModule(props: WithParamsId) {
	const {
		params: { id },
	} = props

	const queryClient = useQueryClient()
	const updateModule = useUpdateModuleMutation({
		onSuccess: () => queryClient.invalidateQueries([modulesQueryKey, modulesQueryKey, id]),
	})

	function handleUpdateModule(title: string, terms: TermType[]) {
		updateModule.mutate({ terms, title, id })
	}
	return (
		<main className={"container"}>
			<ModuleEditor terms={mockTerms(20)} onSubmit={handleUpdateModule} />
		</main>
	)
}
