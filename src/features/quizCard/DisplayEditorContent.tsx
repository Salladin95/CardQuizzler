import React from "react"
import { TermType } from "~/app/models"
import { useTranslations } from "~/app/i18n"
import { EditorContent } from "@tiptap/react"
import { ActionBtn, TermEditorForm } from "~/entites"
import { useQueryClient } from "@tanstack/react-query"
import { EditorToolBar, useConfigureEditor } from "~/features/editor"
import {
	AdjustIcon,
	Button,
	Dialog,
	moduleQueryKey,
	ScrollArea,
	TermEditorCtxProvider,
	UpdateTermPayload,
	useHasOverflow,
	useToast,
	useUpdateTermMutation,
} from "~/shared"

type DisplayEditorContentProps = {
	content: string
	onClick?: (e: React.SyntheticEvent) => void
	term: TermType
}

export function DisplayEditorContent(props: DisplayEditorContentProps) {
	const { content, onClick, term: originalTerm } = props
	const t = useTranslations()
	const [term, setTerm] = React.useState(originalTerm)
	const contentRef = React.useRef<HTMLDivElement>(null!)
	const hasOverflow = useHasOverflow(contentRef.current)

	const editorContent = useConfigureEditor({
		editable: false,
		editorProps: {
			attributes: {
				class: "text-white",
			},
		},
		content,
	})

	const editorContentWithOverflow = useConfigureEditor({
		editable: false,
		editorProps: {
			attributes: {
				class: "text-white",
			},
		},
		content,
	})

	const [showUpdateTerm, setShowUpdateTerm] = React.useState(false)
	const queryClient = useQueryClient()
	const toast = useToast()
	const updateTerm = useUpdateTermMutation({
		onSuccess: () => {
			toast({ variant: "primary", title: t("Generics.success"), description: t("Features.messages.updateTermSuccess") })
			setShowUpdateTerm(false)
			queryClient.resetQueries({ queryKey: [moduleQueryKey, originalTerm.moduleID] })
			updateTerm.reset()
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
		<div className={"w-full h-full flex-center"}>
			<div onClick={onClick} ref={contentRef} className={"w-full h-[75%] flex-center overflow-hidden"}>
				<EditorContent editor={editorContent} className={"my-auto"} />
			</div>

			<Dialog
				open={showUpdateTerm}
				onOpenChange={setShowUpdateTerm}
				className={"bg-gray-600 text-white top-[32vh] p-6 w-320 40:w-428 768:w-640 1024:w-768 rounded"}
				trigger={
					<Button variant={"none"} className={"absolute top-4 -left-[42%] z-[100]"}>
						<AdjustIcon />
					</Button>
				}
			>
				<TermEditorCtxProvider>
					<EditorToolBar className={"mb-6"} />
					<TermEditorForm term={term} onUpdate={handleUpdateTerm} />
					<ActionBtn
						disabled={Boolean(updateTerm.submittedAt)}
						loading={updateTerm.isPending}
						className={"mt-8"}
						onClick={() => updateTerm.mutate(term)}
					>
						{t("Generics.save")}
					</ActionBtn>
				</TermEditorCtxProvider>
			</Dialog>

			{hasOverflow && (
				<Dialog
					className={"bg-purple-gradient top-[54%] 640:top-[28rem] w-320 40:w-428 768:w-640 1024:w-768"}
					trigger={
						<Button variant={"none"} className={"bottom-2 absolute-x-center w-min text-sub-primary"}>
							{t("Generics.more")}
						</Button>
					}
				>
					<ScrollArea className={"w-320 h-[75vh] 40:w-428 768:w-640 1024:w-768 flex-center"}>
						<EditorContent editor={editorContentWithOverflow} />
					</ScrollArea>
				</Dialog>
			)}
		</div>
	)
}
