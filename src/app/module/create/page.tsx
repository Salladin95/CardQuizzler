"use client"
import React from "react"
import { TermType } from "~/app/models"
import { useQueryClient } from "@tanstack/react-query"
import { ModuleEditor } from "src/widgets/moduleEditor"
import { modulesQueryKey, useCreateModuleMutation } from "~/api"

export default function CreateModule() {
	const queryClient = useQueryClient()
	const createModule = useCreateModuleMutation({
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [modulesQueryKey] }),
	})

	function handleCreateModule(title: string, terms: TermType[]) {
		createModule.mutate({ terms, title })
	}

	return (
		<main className={"container"}>
			<ModuleEditor onSubmit={handleCreateModule} />
		</main>
	)
}
