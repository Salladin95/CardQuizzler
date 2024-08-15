import React from "react"
import { TermType } from "~/app/models"
import { useTranslations } from "~/app/i18n"
import { EditorContent, EditorOptions } from "@tiptap/react"
import { Button, cn, Dialog, ScrollArea, useConfigureEditor, useHasOverflow, useUpdateTermCtx } from "~/shared"

type DisplayEditorContentProps = {
	content: string
	term: TermType
	onClick?: (e: React.SyntheticEvent) => void
	render?: (term: TermType) => React.ReactNode
	options?: Partial<EditorOptions>
	className?: string
}

export function DisplayEditorContent(props: DisplayEditorContentProps) {
	const t = useTranslations()
	const { content, options, onClick, term, render, className } = props
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
		...options,
	})

	const editorContentWithOverflow = useConfigureEditor({
		editable: false,
		editorProps: {
			attributes: {
				class: "text-white",
			},
		},
		content,
		...options,
	})

	const { renderUpdateTerm } = useUpdateTermCtx()

	return (
		<div className={"w-full h-full flex-center"}>
			<div
				onClick={onClick}
				ref={contentRef}
				className={cn("w-full h-[75%] flex items-center justify-center overflow-hidden", className)}
			>
				<EditorContent editor={editorContent} className={"my-auto"} />
			</div>

			{renderUpdateTerm ? renderUpdateTerm(term) : null}
			{render ? render(term) : null}

			{hasOverflow && (
				<Dialog
					className={"bg-purple-gradient top-[54%] 640:top-[28rem] w-320 40:w-428 768:w-640 1024:w-768"}
					onClick={(e) => e.stopPropagation()}
					onOverlayClick={(e) => e?.stopPropagation()}
					trigger={
						<Button
							onClick={(e) => e.stopPropagation()}
							variant={"none"}
							className={"bottom-2 absolute-x-center w-min text-primary font-bold"}
						>
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
