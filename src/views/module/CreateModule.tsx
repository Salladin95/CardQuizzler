"use client"
import React from "react"
import { TermType } from "~/app/models"
import { ModuleEditor } from "~/widgets"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { CreateModulePayload, homeDataKey, modulesQueryKey, useCreateModuleMutation } from "~/shared"

export function CreateModulePage(props: { terms: TermType[] }) {
	const { terms } = props
	const router = useRouter()
	const queryClient = useQueryClient()

	const createModule = useCreateModuleMutation({
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [modulesQueryKey, homeDataKey] })
			router.push("/")
		},
	})

	function handleCreateModule(payload: CreateModulePayload) {
		createModule.mutate(payload)
	}

	return (
		<main className={"container"}>
			<ModuleEditor
				terms={terms}
				onSubmit={handleCreateModule}
				isSubmitting={createModule.isPending}
				hasSubmitted={createModule.isSuccess}
			/>
		</main>
	)
}
