"use client"
import React from "react"
import { WithId } from "~/app/types"
import { TermType } from "~/app/models"
import { ModuleEditor } from "~/widgets"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { homeDataKey, Loader, modulesQueryKey, useFetchModule, useUpdateModuleMutation } from "~/shared"

export function EditModulePage(props: WithId) {
	const { id } = props
	const router = useRouter()
	const queryClient = useQueryClient()

	const { data: module, isPending, refetch } = useFetchModule(props.id)

	const updateModule = useUpdateModuleMutation({
		onSuccess: async () => {
			// router.push("/")
			queryClient.invalidateQueries({ queryKey: [modulesQueryKey] })
			queryClient.invalidateQueries({ queryKey: [homeDataKey] })
			refetch()
		},
	})

	const originalTermsIDS = new Set<string>()
	module?.terms.forEach((term) => originalTermsIDS.add(term.id))

	function handleUpdateModule(updatedTitle: string, updatedTerms: TermType[]) {
		const originalTerms = updatedTerms.filter((term) => originalTermsIDS.has(term.id))
		const newTerms = updatedTerms.filter((term) => !originalTermsIDS.has(term.id))
		updateModule.mutate({ updatedTerms: originalTerms, newTerms, title: updatedTitle, id })
	}

	switch (true) {
		case isPending:
			return (
				<main className={"bg-gray-100 flex-center"}>
					<Loader className={"flex-none"} />
				</main>
			)
		default:
			if (module) {
				return (
					<main className={"container"}>
						<ModuleEditor
							moduleName={module.title}
							terms={module.terms}
							onSubmit={handleUpdateModule}
							isSubmitting={updateModule.isPending}
							hasSubmitted={false}
						/>
					</main>
				)
			}
			return null
	}
}
