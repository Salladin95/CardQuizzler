import React from "react"
import { useTranslations } from "~/app/i18n"
import { EditorContent } from "@tiptap/react"
import { useConfigureEditor } from "~/features/editor"
import { Button, cn, Dialog, ScrollArea, useHasOverflow } from "~/shared"

export function DisplayEditorContent(props: { content: string; onClick?: (e: React.SyntheticEvent) => void }) {
	const { content, onClick } = props
	const t = useTranslations()
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

	return (
		<div className={"w-full h-full flex-center"}>
			<div onClick={onClick} ref={contentRef} className={"w-full h-[75%] flex-center overflow-hidden"}>
				<EditorContent editor={editorContent} className={"my-auto"} />
			</div>

			<Dialog
				className={"bg-purple-gradient"}
				trigger={
					<Button
						variant={"none"}
						className={cn("bottom-6 absolute-x-center w-min text-sub-primary", {
							"opacity-0 pointer-events-none": !hasOverflow,
						})}
					>
						{t("Generics.more")}
					</Button>
				}
			>
				<ScrollArea className={"w-428 h-428 flex-center"}>
					<EditorContent editor={editorContentWithOverflow} />
				</ScrollArea>
			</Dialog>
		</div>
	)
}
