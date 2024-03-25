import React from "react"
import { TermType } from "~/app/models"
import { useTranslations } from "~/app/i18n"
import { EditorContent } from "@tiptap/react"
import { Button, Dialog, ScrollArea, useConfigureEditor, useHasOverflow, useUpdateTermCtx } from "~/shared"

type DisplayEditorContentProps = {
	content: string
	term: TermType
	onClick?: (e: React.SyntheticEvent) => void
}

export function DisplayEditorContent(props: DisplayEditorContentProps) {
	const t = useTranslations()
	const { content, onClick, term } = props
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

	const { renderUpdateTerm } = useUpdateTermCtx()

	return (
		<div className={"w-full h-full flex-center"}>
			<div onClick={onClick} ref={contentRef} className={"w-full h-[75%] flex-center overflow-hidden"}>
				<EditorContent editor={editorContent} className={"my-auto"} />
			</div>

			{renderUpdateTerm(term)}

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
