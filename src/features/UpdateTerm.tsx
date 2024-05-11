import React from "react"
import { TermType } from "~/app/models"
import { useTranslations } from "~/app/i18n"
import { ActionBtn, TermEditorForm } from "~/entites"
import { useQueryClient } from "@tanstack/react-query"
import {
	AdjustIcon,
	Button,
	Dialog,
	moduleQueryKey,
	TermEditorCtxProvider,
	UpdateTermPayload,
	useToast,
	useUpdateTermMutation,
} from "~/shared"

type UpdateTermProps = {
	originalTerm: TermType
	renderToolBar: () => React.ReactNode
	onTermUpdate: (term: TermType) => void
}

export function UpdateTerm(props: UpdateTermProps) {
	const { originalTerm, renderToolBar, onTermUpdate } = props
	const t = useTranslations()

	const [term, setTerm] = React.useState(originalTerm)
	const [showUpdateTerm, setShowUpdateTerm] = React.useState(false)
	const queryClient = useQueryClient()
	const toast = useToast()
	const updateTerm = useUpdateTermMutation({
		onSuccess: () => {
			toast({ variant: "primary", title: t("Generics.success"), description: t("Features.messages.updateTermSuccess") })
			setShowUpdateTerm(false)
			queryClient.resetQueries({ queryKey: [moduleQueryKey, originalTerm.moduleID] })
			updateTerm.reset()
			onTermUpdate(term)
		},
		onError: () => {
			toast({ title: t("Generics.error"), description: t("Features.messages.updateTermFailure") })
			setShowUpdateTerm(false)
			updateTerm.reset()
		},
	})

	function handleUpdateTerm(payload: Pick<UpdateTermPayload, "title" | "description">) {
		setTerm({ ...term, ...payload })
	}

	return (
		<Dialog
			open={showUpdateTerm}
			onOpenChange={setShowUpdateTerm}
			className={"bg-gray-600 text-white top-[32vh] p-6 w-320 40:w-428 768:w-640 1024:w-768 rounded"}
			trigger={
				<Button variant={"none"} className={"w-min absolute top-4 left-[2%] z-[100]"}>
					<AdjustIcon />
				</Button>
			}
		>
			<TermEditorCtxProvider>
				{renderToolBar()}
				<TermEditorForm term={term} onUpdate={handleUpdateTerm} />
			</TermEditorCtxProvider>
			<ActionBtn
				disabled={Boolean(updateTerm.submittedAt)}
				loading={updateTerm.isPending}
				className={"mt-8"}
				onClick={() => updateTerm.mutate(term)}
			>
				{t("Generics.save")}
			</ActionBtn>
		</Dialog>
	)
}
