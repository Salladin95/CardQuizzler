"use client"
import React from "react"
import { TermType } from "~/app/models"
import { ModuleEditor } from "~/widgets"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { homeDataKey, modulesQueryKey, useCreateModuleMutation } from "~/shared"

export function CreateModulePage() {
	const router = useRouter()
	const queryClient = useQueryClient()
	const createModule = useCreateModuleMutation({
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [modulesQueryKey, homeDataKey] })
			router.push("/")
		},
	})

	function handleCreateModule(title: string, terms: TermType[]) {
		createModule.mutate({ terms, title })
	}

	return (
		<main className={"container"}>
			<ModuleEditor
				onSubmit={handleCreateModule}
				isSubmitting={createModule.isPending}
				hasSubmitted={createModule.isSuccess}
			/>
		</main>
	)
}
